from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include('general_site.urls')),
    path("zk/", include('zk.urls')),
    path("percolation/", include('percolation.urls')),
    path("opengl-tutorials/", include('interactive_opengl.urls')),
]
