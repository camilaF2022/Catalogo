from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from piezas import views

urlpatterns = [
    path('docs/', include_docs_urls(title="Metadata API")),
    path('', views.CatalogAPIView.as_view()),
    path('artifact/<int:pk>/', views.ArtifactDetailAPIView.as_view()),
    path('artifact/<int:pk>/delete', views.ArtifactDestroyAPIView.as_view()),
    path('artifact/upload', views.ArtifactCreateAPIView.as_view()),
    path('artifacts/', views.ArtifactListAPIView.as_view()),  # This is a temporal view to list all artifacts
]
