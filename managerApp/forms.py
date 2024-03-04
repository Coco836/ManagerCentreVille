from django import forms

class ContactForm(forms.Form):
    sujet = forms.CharField(max_length=300)
    nom = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
