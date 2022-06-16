import App from './app';
import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';
import MotoController from './controllers/motoController';
import RoutesGenerics from './routes/router';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const carRouter = new RoutesGenerics<Car>();
carRouter.addRoute(carController);

const motoController = new MotoController();
const motoRoute = new RoutesGenerics<Motorcycle>();
motoRoute.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRoute.router);

export default server;