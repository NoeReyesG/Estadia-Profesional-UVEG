package services

import (
	"context"
	"errors"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type UserServiceImpl struct {
	userCollection *mongo.Collection
	ctx            context.Context
}

func NewUserService(userCollection *mongo.Collection, ctx context.Context) UserService {
	return &UserServiceImpl{
		userCollection: userCollection,
		ctx:            ctx,
	}
}

func (u *UserServiceImpl) CreateUser(user *models.User) error {

	count, err := u.userCollection.CountDocuments(u.ctx, bson.D{bson.E{Key: "email", Value: user.Email}})
	if err != nil {
		return err
	}

	if count > 0 {
		return errors.New("Email already exists")
	}

	//Generating hash password
	hash, _ := HashPassword(user.Password)
	user.Password = hash

	_, err = u.userCollection.InsertOne(u.ctx, user)

	return err
}

func (u *UserServiceImpl) GetUser(id string) (*models.User, error) {
	var user *models.User
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	query := bson.D{bson.E{Key: "_id", Value: _id}}
	err = u.userCollection.FindOne(u.ctx, query).Decode(&user)
	return user, err
}

func (u *UserServiceImpl) UpdateUser(user *models.User, _id *string) (*mongo.UpdateResult, error) {

	id, err := primitive.ObjectIDFromHex(*_id)
	if err != nil {
		return nil, err
	}
	filter := bson.D{bson.E{Key: "_id", Value: id}}

	updatedUser := bson.D{
		bson.E{Key: "$set", Value: bson.D{
			bson.E{Key: "name", Value: user.Name},
			bson.E{Key: "email", Value: user.Email},
			bson.E{Key: "updated_at", Value: user.UpdatedAt},
		},
		},
	}

	result, err := u.userCollection.UpdateOne(u.ctx, filter, updatedUser)

	return result, err
}

func (u *UserServiceImpl) DeleteUser(_id *string) error {

	id, err := primitive.ObjectIDFromHex(*_id)
	if err != nil {
		return err
	}
	filter := bson.D{bson.E{Key: "_id", Value: id}}
	_, err = u.userCollection.DeleteOne(u.ctx, filter)
	if err != nil {
		return err
	}
	return nil
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
