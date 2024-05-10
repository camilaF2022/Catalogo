from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from piezas import views


router = routers.DefaultRouter()
router.register(r'metadata', views.MetadataView, 'metadata')
urlpatterns = [
    path("crud/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title="Metadata API"))
]