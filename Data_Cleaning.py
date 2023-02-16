import pandas as pd
df = pd.read_pickle("./Crimes_-_2001_to_Present")

# Set boundaries (5-yr study 18-22)
df['temp'] = df['Date'].str[:10]
df['temp'] = pd.to_datetime(df["temp"])
df = df[~(df['temp'] < '2018-01-01')]
df = df[~(df['temp'] > '2022-12-31')]

# Remove null
df = df.dropna()
df = df.drop(columns=['temp'])

# Sort by date
df['Date'] = df['Date'].map(lambda x: pd.to_datetime(x))
df = df.sort_values(by='Date')

# Change type of Zip Code and Police Districts to 'int'
df['Zip Codes'] = df['Zip Codes'].astype(int)
df['Police Districts'] = df['Police Districts'].astype(int)

# Choose desired columns
final_df = df.loc[:, ['ID', 'Date', 'Primary Type', 'Description', 'Location Description', 'Arrest', 
                      'Domestic', 'Location', 'Zip Codes', 'Police Districts']]

# Export
final_df.to_json("./cleaned.json", orient='records')