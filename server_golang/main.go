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

func main(){
    //To run: go run main.go

    //CRUD commands & CORS to allow HTTP Requests
    router := gin.Default()
    router.Use(cors.Default())
    router.GET("/p", getP)
    router.POST("/points", getPoints)

    //Run on Port localhost:8080
    router.Run("localhost:8080")

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
