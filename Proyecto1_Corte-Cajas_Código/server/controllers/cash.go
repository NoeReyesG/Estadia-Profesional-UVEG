package controllers

import (
	"net/http"
	"server/models"
	"server/services"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CashController struct {
	CashService services.CashService
}

func NewCash(cashService services.CashService) CashController {
	return CashController{
		CashService: cashService,
	}
}

func (cc *CashController) CreateCashRegister(ctx *gin.Context) {
	var cash models.CashRegistered
	if err := ctx.ShouldBindJSON(&cash); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	cash.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	cash.ID = primitive.NewObjectID()
	err := cc.CashService.CreateCashRegister(&cash)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (cc *CashController) RegisterCashRoutes(rg *gin.RouterGroup) {
	cashRoute := rg.Group("/cash")
	cashRoute.POST("/create", cc.CreateCashRegister)
}
