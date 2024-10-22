from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='interactive_opengl/page.html'), name='opengl-page'),
]