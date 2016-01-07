__author__ = 'brian'
from rog import views
from django.conf.urls import url,include

from datetime import datetime

urlpatterns = [
    url(r'^$',views.index),
    url(r'^api/',include(
        [
        #url(r'^$', views.index, name='index'),
        url(r'^activities$', views.activities, name='activities'),
        ]),
        name='api'),
]
