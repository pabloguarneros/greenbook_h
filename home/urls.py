from django.urls import path
from . import views

urlpatterns=[
    path('',views.onboard),
    path('home',views.onboard)
]