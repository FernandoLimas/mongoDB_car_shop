import { Car } from '../../../interfaces/CarInterface';
import Sinon from 'sinon';
import { expect } from 'chai';
import CarsService from '../../../services/CarService';
import { getAllCarsMock, carMock, newCarMock } from '../helpers/carMock'
import CarModel from '../../../models/CarModel';


describe('Test the service Car', () => {
  let carModel = new CarModel();
  let carService = new CarsService(carModel);

  describe('testa o create car', () => {
    before(() => { Sinon
      .stub(carModel, 'create')
      .resolves({ ...newCarMock } as Car);
    });

    after(() => {
      (carModel.create as Sinon.SinonStub).restore();
    });
    
    it('Testa se tem todos os atributos', async () => {
      const carCreated = await carService.create(newCarMock);

      expect(carCreated).to.have.property('year');
      expect(carCreated).to.have.property('buyValue');
      expect(carCreated).to.have.property('model');
      expect(carCreated).to.have.property('seatsQty');
      expect(carCreated).to.have.property('color');
      expect(carCreated).to.have.property('doorsQty');
    })

    it('Testa se tem um objeto', async () => {
      const carCreated = await carService.create(newCarMock);

      expect(carCreated).to.be.an('object');
    })

  });

  describe('Testa read', () => {
    before(() => { Sinon
      .stub(carModel, 'read')
      .resolves({ ...getAllCarsMock } as Car[]);
    });

    after(() => {
      (carModel.read as Sinon.SinonStub).restore();
    });

    it('Testa se retorna um array', async () => {
      const getAllCars = await carService.create(newCarMock);

      const allCarsArray = Object.values(getAllCars);

      expect(allCarsArray).to.be.an('array');
    })

    it('Todos os items do array são objetos', async () => {
      const getAllCars = await carService.getAll();
      const allCarsArray = Object.values(getAllCars);

      allCarsArray.forEach((car) => {

        expect(car).to.be.an('object');
      });
    })

    it('Contém todas propriedades', async () => {
      const getAllCars = await carService.getAll();
      const allCarsArray = Object.values(getAllCars);
      

      allCarsArray.forEach((car) => {

        expect(car).to.have.property('_id');
        expect(car).to.have.property('model');
        expect(car).to.have.property('buyValue');
        expect(car).to.have.property('year');
        expect(car).to.have.property('color');
        expect(car).to.have.property('seatsQty');
        expect(car).to.have.property('doorsQty');
      });
    });
  });

  describe('testa readOne', () => {
    before(() => { Sinon
      .stub(carModel, 'readOne')
      .resolves({ ...carMock } as Car);
    });

    after(() => {
      (carModel.readOne as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Retorna um objeto', async () => {
      const showCar = await carService.getById(mockId);

      expect(showCar).to.be.an('object');
    })

    it('Testa se o objeto contém todas as propriedades', async () => {
      const showCar = await carService.getById(mockId);

      expect(showCar).to.have.property('_id');
      expect(showCar).to.have.property('model');
      expect(showCar).to.have.property('year');
      expect(showCar).to.have.property('color');
      expect(showCar).to.have.property('buyValue');
      expect(showCar).to.have.property('seatsQty');
      expect(showCar).to.have.property('doorsQty');
    })
  });

  describe('testa update', () => {
    before(() => { Sinon
      .stub(carModel, 'update')
      .resolves({ ...carMock } as Car);
    });

    after(() => {
      (carModel.update as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Retorna um objeto', async () => {
      const showCar = await carService.update(mockId, carMock);

      expect(showCar).to.be.an('object');
    })

    it('Contain all property', async () => {
      const showCar = await carService.update(mockId, carMock);

      expect(showCar).to.have.property('model');
      expect(showCar).to.have.property('year');
      expect(showCar).to.have.property('seatsQty');
      expect(showCar).to.have.property('color');
      expect(showCar).to.have.property('_id');
      expect(showCar).to.have.property('buyValue');
      expect(showCar).to.have.property('doorsQty');
    })
  });

  describe('testa delete', () => {
    before(() => { Sinon
      .stub(carModel, 'delete')
      .resolves({ ...carMock } as Car);
    });

    after(() => {
      (carModel.delete as Sinon.SinonStub).restore();
    });

    const mockId = '628fafea3b94a2894ec3f9e7';
    it('Retorna um objeto', async () => {
      const deleteCar = await carService.delete(mockId);

      expect(deleteCar).to.exist;
    })
  });
});
