from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('blog', views.blog_view, name='blog'),
    path('blog/<int:article_id>/', views.read_article_view, name='read-article'),
    path('contact', views.contact_view, name='contact'),
]
