from django.urls import path
from django.views.generic import TemplateView
from .views import submit_data

urlpatterns = [
    path('', TemplateView.as_view(template_name='zk/zk.html'), name='zk'),
    path('compute/', submit_data, name='submit_data'),

]