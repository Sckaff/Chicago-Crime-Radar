CREATE TABLE businesses (
    bID INT NOT NULL,
    zipcode INT NOT NULL,
    datetime DATE,
    legal_name VARCHAR(255) NOT NULL,
    license_description VARCHAR(255) NOT NULL,
    police_district INT NOT NULL,
    business_activity VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

CREATE TABLE location (
    zipcode INT NOT NULL,
    police_district INT NOT NULL,
    CONSTRAINT location_pk PRIMARY KEY (zipcode)
);

CREATE TABLE crime_type(
    cID INT NOT NULL,
    crimeType VARCHAR(255) NOT NULL,
    CONSTRAINT crime_type_pk PRIMARY KEY (cID)
);

CREATE TABLE crime_description(
    dID INT NOT NULL,
    cID INT NOT NULL,
    description VARCHAR(1000) NOT NULL,
    CONSTRAINT crime_description_pk PRIMARY KEY (dID),
    CONSTRAINT fk_crime_type
        FOREIGN KEY (cID)
        REFERENCES crime_type(cID)
);

CREATE TABLE report (
    rID INT NOT NULL,
    dID INT NOT NULL,
    zipcode INT NOT NULL,
    datetime DATE,
    latitude FLOAT,
    longitude FLOAT,
    arrest NUMBER(1, 0),
    domestic NUMBER(1, 0),
    surroundings VARCHAR(255),
    CONSTRAINT report_pk PRIMARY KEY (rID),
    CONSTRAINT fk_crime_description
        FOREIGN KEY (dID)
        REFERENCES crime_description(dID),
    CONSTRAINT fk_location
        FOREIGN KEY (zipcode)
        REFERENCES location(zipcode)
);