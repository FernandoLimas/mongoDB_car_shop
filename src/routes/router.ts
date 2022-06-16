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
  }
}

export default CarsRouter;
