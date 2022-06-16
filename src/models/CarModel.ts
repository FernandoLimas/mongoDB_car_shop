import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

const carSchema = new Schema<Car>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  {
    versionKey: false,
  },
);

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}

export default CarModel;
