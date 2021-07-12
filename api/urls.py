from django.urls import path
from . import views

urlpatterns = [
    path('user/<int:pk>', views.UserDetail.as_view()),
    path('plants', views.PlantList.as_view()),
    path('plants/<int:pk>', views.PlantDetail.as_view())
]