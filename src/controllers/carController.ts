import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  public create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const newCar = await this.service.create(req.body);
    if (!newCar) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    if ('error' in newCar) return res.status(400).json(newCar);

    return res.status(201).json(newCar);
  };

  public getAll = async (
    _req: RequestWithBody<Car>,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    const getAllCars = await this.service.getAll();
    if (!getAllCars) {
      return res.status(400).json({ error: this.errors.badRequest });
    }
    
    if ('error' in getAllCars) return res.status(400).json(getAllCars);
    
    return res.status(200).json(getAllCars);
  };
}

export default CarController;
