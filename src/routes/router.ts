import { Router } from 'express';
import Controller from '../controllers';

class CarsRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.getAll);
    this.router.get(`${route}/:id`, controller.getById);
    this.router.put(`${route}/:id`, controller.update);
  }
}

export default CarsRouter;
