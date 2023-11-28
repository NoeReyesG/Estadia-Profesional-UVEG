package services

import (
	"server/models"

	"go.mongodb.org/mongo-driver/mongo"
)

type UserService interface {
	CreateUser(*models.User) error
	GetUser(string) (*models.User, error)
	UpdateUser(*models.User, *string) (*mongo.UpdateResult, error)
	DeleteUser(*string) error
}
