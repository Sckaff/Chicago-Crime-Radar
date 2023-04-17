package main
 
import (
    "net/http"
    "fmt"
    "database/sql"
    _ "github.com/godror/godror"
    "github.com/gin-gonic/gin"
    "server_golang/models"
)

type Body struct {
    // json tag to de-serialize json body
     Time string `json:"time"`
  }

func main(){


    
    db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer db.Close()

    rows,err := db.Query("select zipcode from location")

    if err != nil {
        fmt.Println("Error running query")
        fmt.Println(err)
        return
    }
    defer rows.Close()
 
    var value string
    for rows.Next() {
 
        rows.Scan(&value)
    }
    fmt.Printf("The date is: %s\n", value)


    router := gin.Default()
    router.GET("/p", getP)
    router.POST("/points", getPoints)
    router.Run("localhost:8080")
    // defer db.Close()

   
     
     /* Just to test if the database is working*/

    // rows,err := db.Query("select balance from account")
    // if err != nil {
    //     fmt.Println("Error running query")
    //     fmt.Println(err)
    //     return
    // }
    // defer rows.Close()
 
    // var value string
    // for rows.Next() {
 
    //     rows.Scan(&value)
    // }
    // fmt.Printf("The date is: %s\n", value)
}

func getPoints(c *gin.Context) {

    body:=Body{}

    if err:=c.BindJSON(&body);err!=nil{
        c.IndentedJSON(http.StatusBadRequest, gin.H{"Message": "Invalid Json Body"})
        return
    }
  
    points:= models.GetPoints(body.Time)

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
