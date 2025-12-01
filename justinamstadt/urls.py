from django.urls import path, include

urlpatterns = [
    path("", include('general_site.urls')),
    path("zk/", include('zk.urls')),
    path("percolation/", include('percolation.urls')),
]
