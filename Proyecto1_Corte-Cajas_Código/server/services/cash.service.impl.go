package services

import (
	"context"
	"server/models"

	"go.mongodb.org/mongo-driver/mongo"
)

type CashServiceImpl struct {
	cashCollection *mongo.Collection
	ctx            context.Context
}

func NewCashService(cashCollection *mongo.Collection, ctx context.Context) CashService {
	return &CashServiceImpl{
		cashCollection: cashCollection,
		ctx:            ctx,
	}
}

func (c *CashServiceImpl) CreateCashRegister(cash *models.CashRegistered) error {
	_, err := c.cashCollection.InsertOne(c.ctx, cash)
	return err
}
