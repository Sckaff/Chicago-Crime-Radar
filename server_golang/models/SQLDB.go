package models

import (
	"database/sql"

	_ "github.com/godror/godror"

	"fmt"
)

type HourlyCrimeType struct{
	CrimeType	string
	Hour 		string
	Year 		string
	CountInHour	int
}


func GetCrimeTypes() *[]string {

	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query("SELECT crimetype FROM crime_type")

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	var data []string

	for rows.Next() {

		var value string

		err = rows.Scan(&value)

		
		if err != nil {
			panic(err.Error())
		}

		data = append(data, value)

	}

	return &data
}

func GetHourlyCrimeTypeQuery1(hourStart string, hourEnd string, crimeType1 string, crimeType2 string) (*[]HourlyCrimeType, *[]HourlyCrimeType){

	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil, nil
    }

	defer db.Close()

	rows,err := db.Query("SELECT crimetype,to_char(datetime,'HH24') thehour,to_char(datetime,'YYYY') theyear, count(*) count_in_hour FROM report JOIN crime_description ON crime_description.dID = report.dID JOIN crime_type ON crime_type.cid = crime_description.cid WHERE (crimetype LIKE :crimeType1 OR crimetype LIKE :crimeType2) AND (to_char(datetime,'HH24') >= :hourStart AND to_char(datetime,'HH24') <= :hourEnd) GROUP BY crimetype,to_char(datetime,'YYYY'),to_char(datetime,'HH24') ORDER BY thehour asc", crimeType1, crimeType2, hourStart, hourEnd)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil, nil

	}

	defer rows.Close()

	data1 := []HourlyCrimeType{}
	data2 := []HourlyCrimeType{}

	for rows.Next() {

		var value HourlyCrimeType

		err = rows.Scan(&value.CrimeType, &value.Hour, &value.Year, &value.CountInHour)

		
		if err != nil {
			panic(err.Error())
		}

		if value.CrimeType == crimeType1{
			data1 = append(data1, value)
		} else if value.CrimeType == crimeType2{
			data2 = append(data2, value)
		}

	}

	return &data1, &data2
}




func GetPoints(time string) *string {
	//Change Password depending on your own Oracle SQL
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	
    if err != nil {
        fmt.Println(err)
        return nil
    }
	defer db.Close()


	var a [2]int
	a[0] = 6
	a[1] = 10

	return (&time)
}

func GetP() *string {
	
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query("SELECT zipcode FROM location")

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	var value string
    for rows.Next() {
 
        rows.Scan(&value)
		fmt.Printf("The date is: %s\n", value)
		
    }

	var x string
	x = value
	return &x
}