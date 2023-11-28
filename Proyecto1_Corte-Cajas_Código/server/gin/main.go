package main

import (
	"context"
	"fmt"
	"log"
	"server/controllers"
	"server/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	server         *gin.Engine
	client         *mongo.Client
	ctx            context.Context
	err            error
	userCollection *mongo.Collection
	userController controllers.UserController
	cashController controllers.CashController
	userService    services.UserService
)

func init() {
	// Create mongo.Client with mongo.Connect function
	client, err = mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	// Ping the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("mongo connection established")
	// Get a handle to a database
	db := client.Database("corte")

	// Get a handle to a collection
	userCollection = db.Collection("users")
	cashCollection := db.Collection("cash")

	userService = services.NewUserService(userCollection, ctx)
	cashService := services.NewCashService(cashCollection, ctx)

	userController = controllers.New(userService)
	cashController = controllers.NewCash(cashService)
	server = gin.Default()
	server.Use(cors.Default())
}
func main() {
	defer client.Disconnect(ctx)
	basepath := server.Group("/v1")
	userController.RegisterUserRoutes(basepath)
	cashController.RegisterCashRoutes(basepath)

	log.Fatal(server.Run(":3000"))
}
