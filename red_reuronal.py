#!/usr/bin/env python3
import pandas as pd

# X,Y,month,day,FFMC,DMC,DC,ISI,temp,RH,wind,rain,area
df = pd.read_csv('data/forestfires.csv', sep=',')
df['X'] = df.apply(lambda row: (row['X']-1)/8, axis=1)
df['Y'] = df.apply(lambda row: (row['Y']-2)/7, axis=1)
df['month'] = df.apply(lambda row: row['month'], axis=1)
df['day'] = df.apply(lambda row: row['day'], axis=1)
df['FFMC'] = df.apply(lambda row: (row['FFMC']-18.7)/77.5, axis=1)
df['DMC'] = df.apply(lambda row: (row['DMC']-1.1)/290.2, axis=1)
df['DC'] = df.apply(lambda row: (row['DC']-7.9)/852.7, axis=1)
df['ISI'] = df.apply(lambda row: (row['ISI'])/56.1, axis=1)
df['temp'] = df.apply(lambda row: (row['temp'])/40, axis=1)
df['RH'] = df.apply(lambda row: (row['RH'])/100, axis=1)
df['wind'] = df.apply(lambda row: (row['wind'])/10, axis=1)
df['rain'] = df.apply(lambda row: (row['rain'])/10, axis=1)
df['area'] = df.apply(lambda row: (row['area'])/1500, axis=1)

print(df)