import numpy as np
import pandas as pd
from joblib import load

def get_rms(signal):
    return (np.sqrt(np.mean((signal[0]*0.002) ** 2)))/3.4

def get_variance(signal):
    return np.var(signal * 0.002)

def neural_network(data):
    print("data net: ",data)
    x = data['latitud']
    y = data['longitud']
    normalized_x=(11.9508410181403*x)+86.5796041952803
    normalized_y=(-30.3449744463313*y)+1274.94319048101
    normalized_x=(normalized_x)/9
    normalized_y=(normalized_y)/9
    month=data['month']
    day=data['day']
    FFMC=(data['FFMC']-18.7)/77.5
    DMC=(data['DMC']-1.1)/290.2
    DC=(data['DC']-7.9)/852.7
    ISI=data['ISI']/56.1
    temp=data['temp']/40
    RH=data['RH']/100
    wind=data['wind']/10
    rain=data['rain']/10
    month_jan=1 if month is 1 else 0
    month_feb=1 if month is 2 else 0
    month_mar=1 if month is 3 else 0
    month_apr=1 if month is 4 else 0
    month_may=1 if month is 5 else 0
    month_jun=1 if month is 6 else 0
    month_jul=1 if month is 7 else 0
    month_aug=1 if month is 8 else 0
    month_sep=1 if month is 9 else 0
    month_oct=1 if month is 10 else 0
    month_nov=1 if month is 11 else 0
    month_dec=1 if month is 12 else 0
    day_mon=1 if day is 1 else 0
    day_tue=1 if day is 2 else 0
    day_wed=1 if day is 3 else 0
    day_thu=1 if day is 4 else 0
    day_fri=1 if day is 5 else 0
    day_sat=1 if day is 6 else 0
    day_sun=1 if day is 7 else 0
    columns = [
        'X', 'Y', 'FFMC', 'DMC', 'DC', 'ISI', 'temp', 'RH', 'wind', 'rain',
    'month_apr', 'month_aug', 'month_dec', 'month_feb', 'month_jan',
       'month_jul', 'month_jun', 'month_mar', 'month_may', 'month_nov',
       'month_oct', 'month_sep', 'day_fri', 'day_mon', 'day_sat', 'day_sun',
       'day_thu', 'day_tue', 'day_wed'
        
    ]
    data = [
        normalized_x, normalized_y, FFMC, DMC, DC, ISI, temp, 
        RH, wind, rain, month_apr, month_aug, month_dec, month_feb, month_jan,
        month_jul, month_jun, month_mar, month_may, month_nov,
        month_oct, month_sep, day_fri, day_mon, day_sat, day_sun,
        day_thu, day_tue, day_wed
    ]
    # print('data', data)
    X = pd.DataFrame([data], columns=columns)
    print('dataframe', X.transpose())
    mlp = load('./algoritmo/resources/MLPRegressorbest__1566899474132___0_010564.joblib')
    y_pred = mlp.predict(X)
    print('y_pred', y_pred)
    unnormalized_y_pred = y_pred*1500
    print('unnormalized_y_pred', unnormalized_y_pred)
    return unnormalized_y_pred[0]