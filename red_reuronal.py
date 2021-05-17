#!/usr/bin/env python3
import time
import math
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from random import randint
from joblib import dump, load


# X,Y,month,day,FFMC,DMC,DC,ISI,temp,RH,wind,rain,area
df = pd.read_csv('data/forestfires.csv', sep=',')
df['X'] = df.apply( lambda row: (row['X']-1)/8, axis = 1 )
df['Y'] = df.apply( lambda row: (row['Y']-2)/7, axis = 1 )
df['month'] = df.apply( lambda row: row['month'], axis = 1 )
df['day'] = df.apply( lambda row: row['day'], axis = 1 )
df['FFMC'] = df.apply( lambda row: (row['FFMC']-18.7)/77.5, axis = 1 )
df['DMC'] = df.apply( lambda row: (row['DMC']-1.1)/290.2, axis = 1 )
df['DC'] = df.apply( lambda row: (row['DC']-7.9)/852.7, axis = 1 )
df['ISI'] = df.apply( lambda row: (row['ISI'])/56.1, axis = 1 )
df['temp'] = df.apply( lambda row: (row['temp'])/40, axis = 1 )
df['RH'] = df.apply( lambda row: (row['RH'])/100, axis = 1 )
df['wind'] = df.apply( lambda row: (row['wind'])/10, axis = 1 )
df['rain'] = df.apply( lambda row: (row['rain'])/10, axis = 1 )
df['area'] = df.apply( lambda row: (row['area'])/1500, axis = 1 )

#print(df.corr())
dummiedf = df.loc[:,['month', 'day']]
dummiedf = pd.get_dummies(dummiedf)

df = df.drop(['month', 'day'], axis=1)

df = pd.concat([df, dummiedf], axis=1)

X = df[[
    'X', 'Y', 'FFMC', 'DMC', 'DC', 'ISI', 'temp', 'RH', 'wind', 'rain',
    'month_apr', 'month_aug', 'month_dec', 'month_feb', 'month_jan',
       'month_jul', 'month_jun', 'month_mar', 'month_may', 'month_nov',
       'month_oct', 'month_sep', 'day_fri', 'day_mon', 'day_sat', 'day_sun',
       'day_thu', 'day_tue', 'day_wed']].to_numpy()
y = df['area']

#cor=df.corr()
#print(df.corr())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=True) # test_size=0.1

def create_model(numCapas, neuronasCapa1, neuronasCapa2, neuronasCapa3, neuronasCapa4, fxActivacion):
    capas = {
        2: (neuronasCapa1, neuronasCapa2),
        3: (neuronasCapa1, neuronasCapa2, neuronasCapa3),
        4: (neuronasCapa1, neuronasCapa2, neuronasCapa3, neuronasCapa4),
    }

    mlp = MLPRegressor(
        hidden_layer_sizes=capas[numCapas],
        max_iter=5000000,
        activation=fxActivacion,
        shuffle=True,
        solver='lbfgs'
    )

    mlp.fit(X_train, y_train)

    y_pred = mlp.predict(X)

    mse = mean_squared_error(y, y_pred)
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    mae = mean_absolute_error(y, y_pred)
    rmae = np.sqrt(mean_absolute_error(y, y_pred))
    r2 = r2_score(y, y_pred)


    print(u'Error cuadrático medio: {:.10f}'.format(mse))
    print(u'Raiz Error cuadrático medio (RMSE): %.10f' % rmse)
    print(u'Error absoluto medio (MAE): {:.10f}'.format(mae))
    print(u'Raiz Error absoluto medio: %.2f' % rmae)
    print(u'Estadístico R_2: %.10f' % r2)

    params = mlp.get_params()
    print('Params:', params)
    print('len coef:', len(mlp.coefs_))
    print('len coef[0]:', len(mlp.coefs_[0]))
    print('coefs:', mlp.coefs_)
    print('len intercepts:', len(mlp.intercepts_))
    print('len intercepts[0]:', len(mlp.intercepts_[0]))
    print('intercepts:', len(mlp.intercepts_))

    data = {
        'mse': mse,
        'rmse': rmse,
        'mae': mae,
        'rmae': rmae,
        'r2': r2,
        'params': params,
        'coef': mlp.coefs_,
        'intercepts': mlp.intercepts_,
        'y_pred': y_pred
    }
    return rmse, data, mlp

error_deseado = 0.010
error_obtenido = 1
data = None
mlp = None
error_mejor = 1
while error_obtenido > error_deseado:
    numCapas = randint(2, 4)
    neuronasCapa1 = randint(5, 60)
    neuronasCapa2 = randint(5, 60)
    neuronasCapa3 = randint(5, 60)
    neuronasCapa4 = randint(5, 60)
    indexActivation = randint(0, 3)
    activacion = ('identity', 'logistic', 'tanh', 'relu')
    error_obtenido, data, mlp = create_model(numCapas, neuronasCapa1, neuronasCapa2, neuronasCapa3, neuronasCapa4, activacion[indexActivation])
    if error_obtenido < 0.05:
        error_menor = error_obtenido
        if error_menor <= error_mejor:
            print('Datos:', data)
            print('error_obtenido', error_obtenido)
            texto_error_obtenido = '{0:f}'.format(error_obtenido).replace('.', '_')
            millis = int(round(time.time() * 1000))
            dump(mlp, 'data/MLPRegressorbest__{}__{}.joblib'.format(millis, texto_error_obtenido))
            error_mejor = error_menor
            print('Encontre uno', error_mejor)

texto_error_obtenido = '{0:f}'.format(error_obtenido).replace('.', '_')
millis = int(round(time.time() * 1000))
dump(mlp, 'data/1_MLPRegressorbest__{}__{}.joblib'.format(millis, texto_error_obtenido))
print('Datos finales:', data)
print('error_obtenido final', error_obtenido)
plt.plot(y, color='r')
plt.plot(data['y_pred'], color='b')
plt.show()
