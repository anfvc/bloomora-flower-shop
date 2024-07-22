import {Schema, model} from "mongoose"

export const addressSchema = new Schema({
    street: { type: String},
    houseNum:{type: String},
    zip: { type: String },
    city: { type: String },
    country: { type: String },
  }, {_id: false});

