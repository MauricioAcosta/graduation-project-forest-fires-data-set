from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from algoritmo.neural_network import neural_network
from django.shortcuts import render
import math
# Create your views here.


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


def response_options():
    response = HttpResponse(status=200)
    response['Allow'] = 'OPTIONS, GET, POST'
    response['Access-Control-Request-Method'] = 'OPTIONS, GET, POST'
    response['Access-Control-Request-Headers'] = 'Content-Type'
    response['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


def response_cors(response):
    response['Access-Control-Allow-Origin'] = '*'
    return response


@csrf_exempt
def data_regression_list(request):
    """
    """
    if request.method == 'GET':
        return response_cors(HttpResponse(status=501))

    elif request.method == 'POST':
        datos = JSONParser().parse(request)
        datos['FFMC'] = float(datos['FFMC'])
        datos['DMC'] = float(datos['DMC'])
        datos['DC'] = float(datos['DC'])
        datos['ISI'] = float(datos['ISI'])
        datos['temp'] = float(datos['temp'])
        datos['RH'] = float(datos['RH'])
        datos['wind'] = float(datos['wind'])
        datos['rain'] = float(datos['rain'])
        print(datos)
        area_ha = neural_network(datos)
        area_m2 = 10000 * area_ha
        response = {
            'area': area_m2,
            'radio': pow(area_m2/math.pi, 1/2)
        }
        return response_cors(JSONResponse(response, status=200))

    elif request.method == 'OPTIONS':
        return response_cors(response_options())
