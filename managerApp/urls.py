from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('blog', views.blog_view, name='blog'),
    path('blog/<int:article_id>/', views.read_article_view, name='read-article'),
    path('a-propos', views.about_view, name="about"),
    path('contact', views.contact_view, name='contact'),
    path('mentions-legales', views.legal_mention_view, name='legal_mention'),
]
