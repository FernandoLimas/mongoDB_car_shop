import { Car, ICar } from '../interfaces/CarInterface';
import Service from '.';

import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car) => {
    const parsed = ICar.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const newCar = await this.model.create(obj);
    return newCar;
  };
}

export default CarService;
