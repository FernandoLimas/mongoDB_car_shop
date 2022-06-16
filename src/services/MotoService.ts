import Service from '.';
import MotoModel from '../models/MotoModel';
import {
  Motorcycle,
  MotorcycleInterface,
} from '../interfaces/MotorcycleInterface';

class MotoService extends Service<Motorcycle> {
  constructor(model = new MotoModel()) {
    super(model);
  }

  create = async (obj: Motorcycle) => {
    const parsed = MotorcycleInterface.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const newCar = await this.model.create(obj);
    return newCar;
  };
}
export default MotoService;
