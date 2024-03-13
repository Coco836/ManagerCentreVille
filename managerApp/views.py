from django.shortcuts import render, redirect
from .handlers import load_json_data, get_articles_preview, get_latest_articles_preview
from django.core.mail import EmailMessage
from .forms import ContactForm


# Create your views here.
def home_view(request):
    return render(request, 'managerApp/accueil.html', {'active_page': 'home'})

def blog_view(request):
    json_data = load_json_data()
    first_articles_preview, others_articles_preview = get_articles_preview(json_data["articles"])
    return render(request, 'managerApp/blog.html', {
        'active_page': 'blog',
        'first_articles_preview': first_articles_preview,
        'others_articles_preview': others_articles_preview
    })

def read_article_view(request, article_id):
    articles = load_json_data()
    article = next((article for article in articles["articles"] if article['id'] == article_id), None)
    latest_articles_preview = get_latest_articles_preview(articles["articles"], article_id)
    return render(request, 'managerApp/read_article.html', {'active_page': 'blog', 'article': article, 'latest_articles_preview': latest_articles_preview})

def about_view(request):
    return render(request, 'managerApp/about.html', {'active_page': 'about'})

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            nom = form.cleaned_data['nom']
            sujet = form.cleaned_data['sujet']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            email = EmailMessage(
                subject=sujet,
                body=f'Message de {nom} \n\n {message}',
                from_email='linkcodev83@gmail.com',  # Votre adresse, utilisée pour l'authentification SMTP
                to=['linkcodev83@gmail.com'],  # À qui le mail est envoyé
                headers={'Reply-To': email}  # L'adresse de l'expéditeur original
            )
            email.send()
            return redirect('home')  # Redirige vers une nouvelle URL en cas de succès
    else:
        form = ContactForm()
    return render(request, 'managerApp/contact.html', {'active_page': 'contact', 'form': form})