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

  public getById = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const charRequired = /[0-9A-f]{24}/g.test(id);

    if (!charRequired) {
      return res.status(400)
        .json({ error: this.errors.requiredId });
    }

    try {
      const car = await this.service.getById(id);

      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const charRequired = /[0-9A-f]{24}/g.test(id);

    if (!charRequired) {      
      return res.status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    const carUpdate = await this.service.update(id, req.body);

    if (!carUpdate) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    
    return res.status(200).json(carUpdate);
  };

  public delete = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const charRequired = /[0-9A-f]{24}/g.test(id);

    if (!charRequired) {      
      return res.status(400)
        .json({ error: this.errors.requiredId });
    }

    const deleteCar = await this.service.delete(id);

    if (!deleteCar) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.status(204).json(deleteCar);
  };
}

export default CarController;
