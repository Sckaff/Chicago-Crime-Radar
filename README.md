# Chicago Crime Radar

A tracker for all Chicago Crimes that happened between 2018 and 2022. 

We developed a full-stack web application to provide data-driven insights on Chicago crime trends and neighborhood safety levels. Cleaned and analyzed a large crime dataset using Python, constructed a SQLite database, and built a RESTful API with Go. Designed an interactive React.js front-end displaying complex queries and visualizations based on user location, enabling informed decisions about travel safety. The project involved data engineering, exploratory analysis, database design, API development, and front-end development.

## Data

Database: Oracle
Data: [https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g)

To replicate the data:
- Download each zipcode individually
- Run your data through `Data_Cleaning.py`
- To run the website, go to `client_react` folder
