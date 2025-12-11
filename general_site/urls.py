from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path(
        "", TemplateView.as_view(template_name="general_site/index.html"), name="home"
    ),
    path(
        "japanese-tutoring/",
        TemplateView.as_view(template_name="general_site/japanese-tutoring.html"),
        name="japanese-tutoring",
    ),
    path(
        "opengl-projects/",
        TemplateView.as_view(template_name="general_site/opengl-projects.html"),
        name="opengl-projects",
    ),
    path(
        "programming-projects/",
        TemplateView.as_view(template_name="general_site/programming-projects.html"),
        name="programming-projects",
    ),
    path(
        "resume/",
        TemplateView.as_view(template_name="general_site/resume.html"),
        name="resume",
    ),
    path(
        "blog/",
        TemplateView.as_view(template_name="general_site/blog.html"),
        name="blog",
    ),
    path(
        "blog/improve-vocabulary",
        TemplateView.as_view(template_name="general_site/improve-vocabulary-blog.html"),
        name="improve-vocabulary",
    ),
    path(
        "blog/background-immersion",
        TemplateView.as_view(
            template_name="general_site/how-to-learn-japanese-background-immersion-blog.html"
        ),
        name="background-immersion",
    ),
    path(
        "blog/focused-immersion",
        TemplateView.as_view(
            template_name="general_site/how-to-learn-japanese-focused-immersion-blog.html"
        ),
        name="focused-immersion",
    ),
    path(
        "hiragana-quiz",
        TemplateView.as_view(
            template_name="general_site/hiragana-quiz.html"
        ),
        name="hiragana-quiz",
    ),
]
