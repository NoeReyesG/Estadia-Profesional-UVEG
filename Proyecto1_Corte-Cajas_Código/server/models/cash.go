package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CashRegistered struct {
	ID          primitive.ObjectID `json:"_id" bson:"_id"`
	UserID      primitive.ObjectID `json:"user_id" bson:"user_id"`
	OneThousand int32              `json:"oneThousand" bson:"oneThousand"`
	FiveHundred int32              `json:"fiveHundred" bson:"fiveHundred"`
	TwoHundred  int32              `json:"twoHundred" bson:"twoHundred"`
	OneHundred  int32              `json:"oneHundred" bson:"oneHundred"`
	Fifty       int32              `json:"fifty" bson:"fifty"`
	Twenty      int32              `json:"twenty" bson:"twenty"`
	Ten         int32              `json:"ten" bson:"ten"`
	Five        int32              `json:"five" bson:"five"`
	Two         int32              `json:"two" bson:"two"`
	One         int32              `json:"one" bson:"one"`
	FiftyCents  int32              `json:"fiftyCents" bson:"fiftyCents"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
}
