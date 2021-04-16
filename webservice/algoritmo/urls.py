from django.conf.urls import url
from algoritmo import views


urlpatterns = [
    url(r'^datos_compuestos/$', views.datos_compuesto_list),
]
