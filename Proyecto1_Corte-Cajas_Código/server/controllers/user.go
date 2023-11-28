package controllers

import (
	"net/http"
	"server/models"
	"server/services"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserController struct {
	UserService services.UserService
}

func New(userService services.UserService) UserController {
	return UserController{
		UserService: userService,
	}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	user.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	user.ID = primitive.NewObjectID()
	err := uc.UserService.CreateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})

}

func (uc *UserController) GetUser(ctx *gin.Context) {
	id := ctx.Param("_id")

	user, err := uc.UserService.GetUser(id)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
	}

	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) UpdateUser(ctx *gin.Context) {

	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	id := ctx.Param("_id")
	user.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	result, err := uc.UserService.UpdateUser(&user, &id)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
	}
	if result.MatchedCount != 1 {

	}

	ctx.JSON(http.StatusOK, "success")
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
	id := ctx.Param("_id")
	err := uc.UserService.DeleteUser(&id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	ctx.JSON(http.StatusOK, "success")
}

func (uc *UserController) RegisterUserRoutes(rg *gin.RouterGroup) {
	userRoute := rg.Group("/user")
	userRoute.POST("/create", uc.CreateUser)
	userRoute.GET("/get/:_id", uc.GetUser)
	userRoute.PATCH("/update/:_id", uc.UpdateUser)
	userRoute.DELETE("/delete/:_id", uc.DeleteUser)
}
