package models

import (
	"database/sql"

	_ "github.com/godror/godror"

	"fmt"

	"sort"

)

type HourlyCrimeType struct{
	CrimeType	string
	Hour 		string
	Year 		string
	CountInHour	int
}

type ZipCodeCrimeTypeQuery2 struct {
	Year	string
	Count	int
	ZipCode	string
}

type CrimeTypeLatLong struct {
	CrimeType	string
	Year		string
	CountYear	int
}

type CrimeMonthlyQuery3 struct {
	District	string
	CrimeType	string
	Month		string
	Average		float64
	Arrest      int
}

//Helper Query
func GetCrimeTypes() *[]string {

	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT crimetype 
						  FROM crime_type`)

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

func GetZipCode() *[]string{

	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT zipcode 
						  FROM location 
						  ORDER BY zipcode ASC`)

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

func GetSurroundings() *[]string {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT surroundings 
						  FROM report 
						  GROUP BY surroundings 
						  ORDER BY COUNT(RID) DESC 
						  FETCH FIRST 25 ROWS ONLY`)

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

func GetDistrict () *[]string {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT DISTINCT police_district 
						  FROM location 
						  ORDER BY police_district ASC`)

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

func GetTotalTuples() *int {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT SUM(cnt)
	FROM (
	  SELECT COUNT(*) AS cnt FROM report
	  UNION ALL
	  SELECT COUNT(*) AS cnt FROM crime_type
	  UNION ALL
	  SELECT COUNT(*) AS cnt FROM crime_description
	  UNION ALL
	  SELECT COUNT(*) AS cnt FROM location
	)
	`)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	var value int;

	for rows.Next() {


		err = rows.Scan(&value)

		
		if err != nil {
			panic(err.Error())
		}

	}

	return &value

}

//Query1
func GetHourlyCrimeTypeQuery1(hourStart string, hourEnd string, crimeType1 string, crimeType2 string) (*[]HourlyCrimeType, *[]HourlyCrimeType){

	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil, nil
    }

	defer db.Close()

	rows,err := db.Query(`SELECT crimetype,to_char(datetime,'HH24') thehour,to_char(datetime,'YYYY') theyear, count(*) count_in_hour 
						  FROM report JOIN crime_description ON crime_description.dID = report.dID 
						  	JOIN crime_type ON crime_type.cid = crime_description.cid 
						  WHERE (crimetype LIKE :crimeType1 OR crimetype LIKE :crimeType2) 
						  	AND (to_char(datetime,'HH24') >= :hourStart AND to_char(datetime,'HH24') <= :hourEnd) 
						  GROUP BY crimetype,to_char(datetime,'YYYY'),to_char(datetime,'HH24') 
						  ORDER BY thehour asc`, 
						  crimeType1, crimeType2, hourStart, hourEnd)

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

//Query2
func GetZipCodeQuery2(zipCode string, crimeType string, monthStart int, monthEnd int) *[]ZipCodeCrimeTypeQuery2 {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
	}

	defer db.Close()

	rows,err := db.Query(`WITH cteMax AS (
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID 
							WHERE crimetype LIKE :crimeType1 GROUP BY zipcode 
							ORDER BY max_crime DESC FETCH FIRST 1 ROWS ONLY 
						),
						cteMin AS ( 
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID 
							WHERE crimetype LIKE :crimeType2 GROUP BY zipcode 
							ORDER BY max_crime ASC 
							FETCH FIRST 1 ROWS ONLY 
						) 
						SELECT EXTRACT(year FROM datetime) AS theyear, COUNT(rID) as count, zipcode AS zipcode 
						FROM report JOIN crime_description ON crime_description.dID = report.dID 
							JOIN crime_type ON crime_type.cID = crime_description.cID 
						WHERE crimetype LIKE :crimeType3 AND 
							(zipcode LIKE :zipCode )
							AND to_char(datetime,'MM') >= :monthStart /* Month Bounds */
							AND to_char(datetime,'MM') <= :monthEnd
						GROUP BY
							EXTRACT(YEAR from datetime),
							zipcode
						ORDER BY 
							theyear ASC`, 
						crimeType, crimeType, crimeType, zipCode, monthStart, monthEnd)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	data := []ZipCodeCrimeTypeQuery2{}

	for rows.Next() {

		var value ZipCodeCrimeTypeQuery2

		err = rows.Scan(&value.Year, &value.Count, &value.ZipCode)

		
		if err != nil {
			panic(err.Error())
		}

		data = append(data, value)

		fmt.Printf(value.Year)
	}

	return &data
}

//Query2 Max
func GetMaxZipCodeQuery2(crimeType string, monthStart int, monthEnd int) *[]ZipCodeCrimeTypeQuery2 {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
	}

	defer db.Close()

	rows,err := db.Query(`WITH cteMax AS (
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID 
							WHERE crimetype LIKE :crimeType1 
							GROUP BY zipcode 
							ORDER BY max_crime DESC 
							FETCH FIRST 1 ROWS ONLY 
						),
						cteMin AS ( 
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID
							WHERE crimetype LIKE :crimeType2 
							GROUP BY zipcode ORDER BY max_crime ASC 
							FETCH FIRST 1 ROWS ONLY 
						) 
						SELECT EXTRACT(year FROM datetime) AS theyear, COUNT(rID) as count, zipcode AS zipcode 
						FROM report JOIN crime_description ON crime_description.dID = report.dID 
							JOIN crime_type ON crime_type.cID = crime_description.cID 
						WHERE crimetype LIKE :crimeType3 AND 
							(zipcode IN (SELECT zipcode FROM cteMax) )
							AND to_char(datetime,'MM') >= :monthStart /* Month Bounds */
							AND to_char(datetime,'MM') <= :monthEnd
						GROUP BY
							EXTRACT(YEAR from datetime),
							zipcode
						ORDER BY 
							theyear ASC`, 
						crimeType, crimeType, crimeType, monthStart, monthEnd)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	data := []ZipCodeCrimeTypeQuery2{}

	for rows.Next() {

		var value ZipCodeCrimeTypeQuery2

		err = rows.Scan(&value.Year, &value.Count, &value.ZipCode)

		
		if err != nil {
			panic(err.Error())
		}

		data = append(data, value)

		fmt.Printf(value.Year)
	}

	return &data
}

//Query2 Min
func GetMinZipCodeQuery2(crimeType string, monthStart int, monthEnd int) *[]ZipCodeCrimeTypeQuery2 {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
	}

	defer db.Close()

	rows,err := db.Query(`WITH cteMax AS (
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID 
							WHERE crimetype LIKE :crimeType1 GROUP BY zipcode 
							ORDER BY max_crime DESC 
							FETCH FIRST 1 ROWS ONLY 
						),
						cteMin AS ( 
							SELECT zipcode,MAX(COUNT(rID)) OVER (PARTITION BY zipcode) max_crime 
							FROM report JOIN crime_description ON crime_description.dID = report.dID 
								JOIN crime_type ON crime_type.cID = crime_description.cID 
							WHERE crimetype LIKE :crimeType2 
							GROUP BY zipcode 
							ORDER BY max_crime ASC 
							FETCH FIRST 1 ROWS ONLY 
						) 
						SELECT EXTRACT(year FROM datetime) AS theyear, COUNT(rID) as count, zipcode AS zipcode 
						FROM report JOIN crime_description ON crime_description.dID = report.dID 
							JOIN crime_type ON crime_type.cID = crime_description.cID 
						WHERE crimetype LIKE :crimeType3 AND 
							(zipcode IN (SELECT zipcode FROM cteMin))
							AND to_char(datetime,'MM') >= :monthStart /* Month Bounds */
							AND to_char(datetime,'MM') <= :monthEnd
						GROUP BY
							EXTRACT(YEAR from datetime),
							zipcode
						ORDER BY 
							theyear ASC`, 
						crimeType, crimeType, crimeType, monthStart, monthEnd)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	defer rows.Close()

	data := []ZipCodeCrimeTypeQuery2{}

	for rows.Next() {

		var value ZipCodeCrimeTypeQuery2

		err = rows.Scan(&value.Year, &value.Count, &value.ZipCode)

		
		if err != nil {
			panic(err.Error())
		}



		data = append(data, value)

		fmt.Printf(value.Year)
	}

	if len(data) != 5 {
		var years []string
		for i:=0; i < len(data); i++ {
			years = append(years, data[i].Year)
		}
		if(stringInSlice("2018", years) == false){
			temp := ZipCodeCrimeTypeQuery2{
				Year: "2018",
				Count: 0,
				ZipCode:  data[0].ZipCode,
			}

			data = append(data, temp)
		}
		if(stringInSlice("2019", years) == false){
			temp := ZipCodeCrimeTypeQuery2{
				Year: "2019",
				Count: 0,
				ZipCode:  data[0].ZipCode,
			}

			data = append(data, temp)
		}
		if(stringInSlice("2020", years) == false){
			temp := ZipCodeCrimeTypeQuery2{
				Year: "2020",
				Count: 0,
				ZipCode:  data[0].ZipCode,
			}

			data = append(data, temp)
		}
		if(stringInSlice("2021", years) == false){
			temp := ZipCodeCrimeTypeQuery2{
				Year: "2021",
				Count: 0,
				ZipCode:  data[0].ZipCode,
			}

			data = append(data, temp)
		}
		if(stringInSlice("2022", years) == false){
			temp := ZipCodeCrimeTypeQuery2{
				Year: "2022",
				Count: 0,
				ZipCode: data[0].ZipCode,
			}

			data = append(data, temp)
		}
	}

	sort.Slice(data, func(i, j int) bool {
		return data[i].Year < data[j].Year
	})

	return &data
}

//Helper Query
func stringInSlice(a string, list []string) bool {
    for _, b := range list {
        if b == a {
            return true
        }
    }
    return false
}

//Query3
func GetMonthlyQuery3(crimeType string, zipCode string, monthStart int, monthEnd int, yearStart int, yearEnd int) (*[]CrimeMonthlyQuery3, *[]CrimeMonthlyQuery3) {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil, nil
	}

	defer db.Close()

	rows,err := db.Query(`SELECT police_district, crimetype, themonth, AVG(count_in_month) AS avg_count_in_month, arrest
						  FROM (
							SELECT police_district,crimetype,to_char(datetime,'MM') themonth,to_char(datetime,'YYYY') theyear, count(*) count_in_month,arrest
							FROM report
							JOIN crime_description ON crime_description.dID = report.dID
							JOIN crime_type ON crime_type.cid = crime_description.cid
							JOIN location ON location.zipcode = report.zipcode
							WHERE crimetype LIKE :crimeType /* Chosen Types of Crime Here*/
								AND police_district IN (
									SELECT police_district 
									FROM location 
									WHERE zipcode LIKE :zipCode /* User zipcode here */
								)
								AND to_char(datetime,'MM') >= :monthStart /* Month Lower */
								AND to_char(datetime,'MM') <= :monthEnd /* Month Upper */
								AND to_char(datetime,'YYYY') >= :yearStart /* Year Lower */
								AND to_char(datetime,'YYYY') <= :yearEnd /* Year Upper */
							GROUP BY police_district,crimetype,to_char(datetime,'MM'),to_char(datetime,'YYYY'),arrest)
						  GROUP BY police_district, crimetype, themonth, arrest
						  ORDER BY themonth ASC`, 
  						crimeType, zipCode, monthStart, monthEnd, yearStart, yearEnd)

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil, nil

	}

	defer rows.Close()

	dataNotArrest := []CrimeMonthlyQuery3{}
	dataArrest := []CrimeMonthlyQuery3{}

	for rows.Next() {

		var value CrimeMonthlyQuery3

		err = rows.Scan(&value.District, &value.CrimeType, &value.Month, &value.Average, &value.Arrest)

		
		if err != nil {
			panic(err.Error())
		}

		if(value.Arrest == 1){
			dataArrest = append(dataArrest, value)
		} else if value.Arrest == 0 {
			dataNotArrest = append(dataNotArrest, value)
		}

		// data = append(data, value)

	}

	return &dataArrest, &dataNotArrest
}

//Query4
func GetLatLongQuery4(latitude float64, longitude float64, business string, crimeType1 string, crimeType2 string, startYear int, endYear int) (*[]CrimeTypeLatLong, *[]CrimeTypeLatLong) {
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil, nil
	}

	defer db.Close()

	// rows,err := db.Query("SELECT crimetype,to_char(datetime,'YYYY') theyear, count(*) count_in_year FROM report JOIN crime_description ON crime_description.dID = report.dID JOIN crime_type ON crime_type.cid = crime_description.cid WHERE (latitude > (:latitude - 0.2)) AND (latitude < (:latitude + 0.2)) AND (longitude > (:longitude - 0.2)) AND (longitude < (:longitude + 0.2)) AND surroundings LIKE 'RESTAURANT' AND (crimetype LIKE :crimeType1 OR crimetype LIKE :crimeType2) GROUP BY crimetype,to_char(datetime,'YYYY') ORDER BY crimetype,theyear asc", latitude, longitude, business, crimeType1, crimeType2)

	rows,err := db.Query(`SELECT crimetype,to_char(datetime,'YYYY') theyear, count(*) count_in_year 
						  FROM report JOIN crime_description ON crime_description.dID = report.dID 
						  	JOIN crime_type ON crime_type.cid = crime_description.cid 
						  WHERE (latitude > (:latitude - 0.2)) 
						  	AND (latitude < (:latitude2 + 0.2)) 
							AND (longitude > (:longitude - 0.2)) 
							AND (longitude < (:longitude2 + 0.2))
							AND to_char(datetime,'YYYY') >= :startYear /* Year Lower */
							AND to_char(datetime,'YYYY') <= :endYear /* Year Upper */
							AND surroundings LIKE :business1  
							AND (crimetype LIKE :crimeType1 OR crimetype LIKE :crimeType2) 
						  GROUP BY crimetype,to_char(datetime,'YYYY') 
						  ORDER BY crimetype,theyear asc`, 
						  latitude, latitude, longitude, longitude, startYear, endYear, business, crimeType1, crimeType2)  
	if err != nil {

		fmt.Println("Err", err.Error())

		return nil, nil

	}

	defer rows.Close()

	data1 := []CrimeTypeLatLong{}
	data2 := []CrimeTypeLatLong{}

	// fmt.Println(longitude)


	for rows.Next() {

		var value CrimeTypeLatLong

		err = rows.Scan(&value.CrimeType, &value.Year, &value.CountYear)

		
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf(value.CrimeType)

		if value.CrimeType == crimeType1{
			data1 = append(data1, value)
		} else if value.CrimeType == crimeType2{
			data2 = append(data2, value)
		}

		// data1 = append(data1, value)

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