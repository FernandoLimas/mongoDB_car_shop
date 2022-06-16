import { Schema, model as createModel } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

const motoSchema = new Schema<Motorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  {
    versionKey: false,
  },
);

class MotoModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', motoSchema)) {
    super(model);
  }
}

export default MotoModel;
