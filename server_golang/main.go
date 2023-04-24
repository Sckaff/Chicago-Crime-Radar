package main

import (
	// "fmt"
	"net/http"
	// "fmt"
	// "database/sql"
    // "strconv"
	"server_golang/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/godror/godror"
)

type Body struct {
    // json tag to de-serialize json body
     Time string `json:"time"`
}

type Query1Body struct {
    HourStart string     `json:"hourStart"`
    HourEnd string       `json:"hourEnd"`
    CrimeType1 string    `json:"crimeType1"`
    CrimeType2 string   `json:"crimeType2"`
}

type returnQuery1 struct {
    Data1 []models.HourlyCrimeType
    Data2 []models.HourlyCrimeType
}

type Query2Body struct {
    ZipCode string      `json:"zipCode"`
    CrimeType string    `json:"crimeType"`
    MonthStart int      `json:"monthStart"`
    MonthEnd int        `json:"monthEnd"`
}

type QueryMaxMin2Body struct {
    CrimeType string    `json:"crimeType"`
    MonthStart int      `json:"monthStart"`
    MonthEnd int        `json:"monthEnd"`
}

type Query3Body struct {
    ZipCode string      `json:"zipCode"`
    CrimeType string    `json:"crimeType"`
    MonthStart int      `json:"monthStart"`
    MonthEnd int        `json:"monthEnd"`
    YearStart int       `json:"yearStart"`
    YearEnd int         `json:"yearEnd"`
}

type returnQuery3 struct {
    DataArrest []models.CrimeMonthlyQuery3
    DataNotArrest  []models.CrimeMonthlyQuery3

}

type Query4Body struct {
    Latitude float64        `json:"latitude"`
    Longitude float64        `json:"longitude"`
    Business string     `json:"business"`
    CrimeType1 string   `json:"crimeType1"`
    CrimeType2 string   `json:"crimeType2"`
    StartYear int       `json:"startYear"`
    EndYear int         `json:"endYear"`
}

type returnQuery4 struct {
    Data1 []models.CrimeTypeLatLong
    Data2 []models.CrimeTypeLatLong
}



func main(){
    //To run: go run main.go

    //CRUD commands & CORS to allow HTTP Requests
    router := gin.Default()
    router.Use(cors.Default())

    
    router.GET("/crimetypes", getCrimeTypes)
    router.GET("/zipcode", getZipCodes)
    router.GET("/surroundings", getSurroundings)
    router.GET("/district", getDistrict)
    router.GET("/tuples", getTotalTuples)

    router.POST("/query1", getHourlyCrimeType)
    router.POST("/query2", getZipCodeWithCrimeType)
    router.POST("/query2Max", getMaxZipCode)
    router.POST("/query2Min", getMinZipCode)
    router.POST("/query3", getMonthlyQuery3)
    router.POST("/query4", getLatLongQuery4)
    


    router.GET("/p", getP)
    router.POST("/points", getPoints)

    //Run on Port localhost:8080
    router.Run("localhost:8080")

}

//Helper Queries
func getZipCodes(c *gin.Context) {
    data := models.GetZipCode()
    c.IndentedJSON(http.StatusOK, data)
}


func getCrimeTypes(c *gin.Context) {

    data := models.GetCrimeTypes()

    c.IndentedJSON(http.StatusOK, data)
}

func getSurroundings(c *gin.Context){
    data := models.GetSurroundings()
    c.IndentedJSON(http.StatusOK, data)
}

func getDistrict(c *gin.Context){
    data := models.GetDistrict()
    c.IndentedJSON(http.StatusOK, data)
}

func getTotalTuples(c *gin.Context){
    data := models.GetTotalTuples()
    c.IndentedJSON(http.StatusOK, data)
}


//Query 1
func getHourlyCrimeType(c *gin.Context) {
    query1Body := Query1Body{}

    if err:=c.BindJSON(&query1Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }

    data1, data2 := models.GetHourlyCrimeTypeQuery1(query1Body.HourStart, query1Body.HourEnd,query1Body.CrimeType1, query1Body.CrimeType2)

    result := returnQuery1{
        Data1: *data1,
        Data2: *data2,
    }
    

    c.IndentedJSON(http.StatusOK, result)
    // c.IndentedJSON(http.StatusOK, data2)
}

//Query 2 ZipCode
func getZipCodeWithCrimeType(c *gin.Context) {
    query2Body := Query2Body{}
    if err:=c.BindJSON(&query2Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }

    data := models.GetZipCodeQuery2(query2Body.ZipCode, query2Body.CrimeType, query2Body.MonthStart, query2Body.MonthEnd)

    c.IndentedJSON(http.StatusOK, data)
    // c.IndentedJSON(http.StatusOK, query2Body)

}

//Query 2 Max
func getMaxZipCode (c *gin.Context) {
    queryMaxMin2Body := QueryMaxMin2Body{}
    if err:=c.BindJSON(&queryMaxMin2Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }

    data := models.GetMaxZipCodeQuery2(queryMaxMin2Body.CrimeType, queryMaxMin2Body.MonthStart, queryMaxMin2Body.MonthEnd)

    c.IndentedJSON(http.StatusOK, data)
    // c.IndentedJSON(http.StatusOK, queryMaxMin2Body)

}

//Query 2 Min
func getMinZipCode (c *gin.Context) {
    queryMaxMin2Body := QueryMaxMin2Body{}
    if err:=c.BindJSON(&queryMaxMin2Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }

    data := models.GetMinZipCodeQuery2(queryMaxMin2Body.CrimeType, queryMaxMin2Body.MonthStart, queryMaxMin2Body.MonthEnd )

    c.IndentedJSON(http.StatusOK, data)
    // c.IndentedJSON(http.StatusOK, queryMaxMin2Body)
}




//Query 3
func getMonthlyQuery3(c *gin.Context) {
    query3Body := Query3Body{}
    if err:=c.BindJSON(&query3Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }

    dataA, dataNA := models.GetMonthlyQuery3(query3Body.CrimeType, query3Body.ZipCode, query3Body.MonthStart, query3Body.MonthEnd, query3Body.YearStart, query3Body.YearEnd)

    result := returnQuery3{
        DataArrest: *dataA,
        DataNotArrest: *dataNA,
    }
    c.IndentedJSON(http.StatusOK, result)
}


//Query 4
func getLatLongQuery4(c *gin.Context) {
    query4Body := Query4Body{}
    
    if err:=c.BindJSON(&query4Body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }


    data1, data2 := models.GetLatLongQuery4(query4Body.Latitude,query4Body.Longitude, query4Body.Business, query4Body.CrimeType1, query4Body.CrimeType2, query4Body.StartYear, query4Body.EndYear)

    result := returnQuery4{
        Data1: *data1,
        Data2: *data2,
    }

    c.IndentedJSON(http.StatusOK, result)
}

func getPoints(c *gin.Context) {

    //Body is a Struct (Look Line 13) go ahead
    //Customize Body based on what is passed to API from frontend
    body:=Body{}

    if err:=c.BindJSON(&body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }
  
    //Calls the Function with SQL from SQLDB.go
    
    points:= models.GetPoints(body.Time)

    
    //Allows for Json response
    c.IndentedJSON(http.StatusOK, points)
}

func getP(c *gin.Context) {

    point := models.GetP()
    
    c.IndentedJSON(http.StatusOK, point)
}


















// package main

// import (
// 	"fmt"
// 	"server_golang/Config"

// 	"github.com/jinzhu/gorm"
// 	// _ "github.com/go-sql-driver/mysql"
// 	_ "github.com/godror/godror"
// 	// _ "github.com/mattn/go-oci8"
// )

// var err error

// func main() {
// 	fmt.Println("Hello World")
// 	Config.DB, err = gorm.Open("godror", Config.DbURL(Config.BuildDBConfig()))
// 	if err != nil {
// 		fmt.Println("Status:", err)
// 	}

// 	defer Config.DB.Close()
	
// }
