package models

import (
	"database/sql"

	_ "github.com/godror/godror"

	"fmt"
)



func GetPoints(time string) *string {
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

func GetP() *int {
	
	db, err := sql.Open("godror", `user="ch.lin" password="fh5CyWai7Ppx8aIdELGDUr3m" connectString="oracle.cise.ufl.edu:1521/orcl"`)
	if err != nil {
        fmt.Println(err)
        return nil
    }

	defer db.Close()

	// rows,err := db.Query("SELECT zipcode FROM location")

	// if err != nil {

	// 	fmt.Println("Err", err.Error())

	// 	return nil

	// }

	// var value string
    // for rows.Next() {
 
    //     rows.Scan(&value)
    // }
	// fmt.Printf("The date is: %s\n", value)

	var x int
	x = 4
	return &x
}