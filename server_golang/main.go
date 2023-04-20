package main
 
import (
    "net/http"
    // "fmt"
    // "database/sql"
    _ "github.com/godror/godror"
    "github.com/gin-gonic/gin"
    "server_golang/models"
    "github.com/gin-contrib/cors"
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



func main(){
    //To run: go run main.go

    //CRUD commands & CORS to allow HTTP Requests
    router := gin.Default()
    router.Use(cors.Default())

    router.POST("/query1", getHourlyCrimeType)
    router.GET("/crimetypes", getCrimeTypes)


    router.GET("/p", getP)
    router.POST("/points", getPoints)

    //Run on Port localhost:8080
    router.Run("localhost:8080")

}

func getCrimeTypes(c *gin.Context) {

    data := models.GetCrimeTypes()

    c.IndentedJSON(http.StatusOK, data)

}

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
