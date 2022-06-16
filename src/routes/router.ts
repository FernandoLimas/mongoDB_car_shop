import { Router } from 'express';
import Controller from '../controllers';

class RoutesGenerics<T> {
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
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default RoutesGenerics;
