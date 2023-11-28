package services

import "server/models"

type CashService interface {
	CreateCashRegister(*models.CashRegistered) error
}
