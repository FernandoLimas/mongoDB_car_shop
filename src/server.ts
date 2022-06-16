import App from './app';
import CarRouter from './routes/router';
import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CarRouter<Car>();

carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
