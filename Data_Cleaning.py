import pandas as pd
import numpy as np
import glob

filenames = glob.glob('./Merge/*.csv')

df = pd.read_csv(filenames[0])
zipcode = filenames[0][8:-4]
df['Zip Code'] = zipcode

for i, file in enumerate(filenames):
    if i == 0:  
        continue

    temp = pd.read_csv(file)
    zipcode = file[8:-4]
    temp['Zip Code'] = zipcode
    df = df.merge(temp, how='outer')
    
df.to_pickle('crime.pkl')

df_crime = pd.read_pickle('crime.pkl')

# Set boundaries (5-yr study 18-22)
df_crime['temp'] = df_crime['Date'].str[:10]
df_crime['temp'] = pd.to_datetime(df_crime["temp"])
df_crime = df_crime[~(df_crime['temp'] < '2018-01-01')]
df_crime = df_crime[~(df_crime['temp'] > '2022-12-31')]

# Remove null
df_crime = df_crime.dropna()
df_crime = df_crime.drop(columns=['temp'])

# Sort by date
df_crime['Date'] = df_crime['Date'].map(lambda x: pd.to_datetime(x))
df_crime = df_crime.sort_values(by='Date')

# Get police district from big dataset
df_temp = pd.read_csv('Crimes_-_2001_to_Present.csv')

df_crime = df_crime.set_index('ID')
df_temp = df_temp.set_index('ID')
df_crime = df_crime.merge(df_temp['Police Districts'], how='left', left_on='ID', right_on='ID')
df_crime = df_crime.dropna()
df_crime['Police Districts'] = df_crime['Police Districts'].astype(int)

report = df_crime.loc[:, ['Date', 'Arrest', 'Domestic', 'Location Description', 'Latitude', 'Longitude', 'Description', 'Zip Code', 'Primary Type']]

location = df_crime.loc[:, ['Zip Code', 'Police Districts']].set_index('Zip Code')
location = location.reset_index().drop_duplicates(subset=['Zip Code']).set_index('Zip Code')

crime_description = df_crime.loc[:, 'Description']
crime_description = crime_description.drop_duplicates().reset_index().drop(columns=['ID']).reset_index()

crime_type = df_crime.loc[:, 'Primary Type']
crime_type = crime_type.drop_duplicates().reset_index().drop(columns=['ID']).reset_index()

temp = report.merge(crime_description, on='Description').rename(columns={'index': 'Description ID'}).merge(crime_type, on='Primary Type').rename(columns={'index': 'Type ID'}).sort_values(by='Date')
crime_description = temp[['Description', 'Type ID']].drop_duplicates(subset=['Description']).reset_index().drop(columns=['index'])
crime_type = temp[['Primary Type', 'Type ID']].drop_duplicates().sort_values(by='Type ID').reset_index().drop(columns=['index', 'Type ID'])
report = temp.drop(columns=['Type ID', 'Description', 'Primary Type']).reset_index().drop(columns=['index'])

# REPORT FIX
dID = pd.read_csv('./data/crime_description.csv')[['Description', 'Type ID']]
crime_dict = dict(zip(dID['Description'], dID['Type ID']))

report['Description'] = report['Description'].map(crime_dict)
report['Arrest'] = report['Arrest'].astype(int)
report['Domestic'] = report['Domestic'].astype(int)
report = report.drop(columns=['Primary Type'])
report['Date'] = pd.to_datetime(report['Date']).dt.strftime('%Y-%m-%d %H:%M:%S')
report.to_csv('report_with_time.csv')
report = df_crime.loc[:, ['Date', 'Arrest', 'Domestic', 'Location Description', 'Latitude', 'Longitude', 'Description', 'zipcode', 'Primary Type']]

# LOCATION FIX
location = pd.read_csv('./data/location.csv').drop(columns=['Unnamed: 0'])
location.set_index('Zip Code').to_csv('./data/location.csv')

report.to_csv('./data/report.csv')
crime_description.to_csv('./data/crime_description.csv')
crime_type.to_csv('./data/crime_type.csv')
location.to_csv('./data/location.csv')

df_business = pd.read_csv('business_Licenses_-_Current_Active.csv')

# Set boundaries (5-yr study 18-22)
df_business['temp'] = pd.to_datetime(df_business["DATE ISSUED"])
df_business = df_business[~(df_business['temp'] < '2018-01-01')]
df_businessdf = df_business[~(df_business['temp'] > '2022-12-31')]

# Remove null
df_business = df_business.drop(columns=['temp'])
df_business = df_business[df_business['CITY'] == 'CHICAGO']
df_business = df_business.loc[:, ['ID', 'DATE ISSUED', 'ZIP CODE', 'LEGAL NAME', 'LICENSE DESCRIPTION', 
                                  'POLICE DISTRICT', 'BUSINESS ACTIVITY','LATITUDE', 'LONGITUDE']]

df_business = df_business.dropna()
df_business = df_business.reset_index().drop(columns=['ID','index', 'POLICE DISTRICT'])
df_business['ZIP CODE'] = df_business['ZIP CODE'].astype(int)

test_report = report['Zip Code'].unique()
test_report = test_report.astype('int64')

test_business = df_business['ZIP CODE'].unique()

result = np.setdiff1d(test_business, test_report)

# Remove zip codes that has no crime data
df_business = df_business.loc[df_business['ZIP CODE'] != 60632]
df_business = df_business.loc[df_business['ZIP CODE'] != 62066]

# FIX TIME IN BUSINESS DATA
df_business = pd.read_csv('./data/business_licenses.csv').drop(columns=['Unnamed: 0'])
df_business = pd.read_csv('Business_Licenses_-_Current_Active.csv')

df_business['DATE ISSUED'] = pd.to_datetime(df_business['DATE ISSUED']).dt.strftime('%d-%b-%Y') # ’YYYY-MON-DD HH24:MI’

df_business = df_business[~(df_business['DATE ISSUED'] < '2018-01-01')]
df_business = df_business[~(df_business['DATE ISSUED'] > '2022-12-31')]
df_business.sort_values(by='DATE ISSUED')

df_business.to_csv('./data/business_licenses.csv')

df_business.to_csv('./data/business_licenses.csv')