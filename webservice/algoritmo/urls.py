from django.conf.urls import url
from algoritmo import views


urlpatterns = [
    url(r'^area_affected_by_forest_fires/$', views.data_regression_list),
]
