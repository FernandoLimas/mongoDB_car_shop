import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotoService from '../services/MotoService';

class MotoController extends Controller<Motorcycle> {
  private $route: string;
  
  constructor(
    service = new MotoService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  public create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const newMoto = await this.service.create(req.body);
    if (!newMoto) {
      return res.status(400).json({ error: this.errors.badRequest });
    }
    
    if ('error' in newMoto) return res.status(400).json(newMoto);
    
    return res.status(201).json(newMoto);
  };

  public getAll = async (
    _req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    const allMotos = await this.service.getAll();
    if (!allMotos) {
      return res.status(400).json({ error: this.errors.badRequest });
    }
    
    if ('error' in allMotos) return res.status(400).json(allMotos);
    
    return res.status(200).json(allMotos);
  };

  public getById = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const charRequired = /[0-9A-f]{24}/g;

    if (!charRequired.test(id)) {
      return res.status(400)
        .json({ error: this.errors.requiredId });
    }
    const motoById = await this.service.getById(id);
    
    if (!motoById) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    
    return res.status(200).json(motoById);
  };

  public update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    const charRequired = /[0-9A-f]{24}/g;

    if (!charRequired.test(id)) {      
      return res.status(400)
        .json({ error: this.errors.requiredId });
    }

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400).json({ error: this.errors.badRequest });
    }

    const updateMoto = await this.service.update(id, req.body);

    if (!updateMoto) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    
    return res.status(200).json(updateMoto);
  };

  public delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const charRequired = /[0-9A-f]{24}/g;

    if (!charRequired.test(id)) {      
      return res.status(400)
        .json({ error: this.errors.requiredId });
    }

    const deleteMoto = await this.service.delete(id);
    
    return deleteMoto
      ? res.status(204).json()
      : res.status(404).json({ error: this.errors.notFound });
    // if (!deleteMoto) {
    //   return res.status(404).json({ error: this.errors.notFound });
    // }
    
    // return res.status(204).json(deleteMoto);
  };
}

export default MotoController;
