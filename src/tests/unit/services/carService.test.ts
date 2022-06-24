import CarService from "../../../services/CarService";
import MotoService from "../../../services/MotoService";
import { expect } from "chai";
import { allCarsMock, oneCarMock, newCarMock } from "../helpers/carMock";
import { oneMotorcycleMock, newMotorcycleMock } from "../helpers/motoMock";
import Sinon, { SinonStub } from "sinon";
import { updatedCar } from "../../../../__tests__/utils/CarsMock";

describe('Test CarService', () => {
    const modelcar = new CarService();
    describe('should create new car', () => {

      before(() => {
          Sinon.stub(modelcar, "create").resolves(oneCarMock);
          
      })

      after(() => {
          (modelcar.create as SinonStub).restore();
      })

      it('should create new car', async () => {
          const createCar = await modelcar.create(newCarMock);
          expect(createCar).to.be.an('object');
          expect(createCar).to.have.property('color');
          expect(createCar).to.deep.equal(oneCarMock);
      })

    })

    describe('read', () => {
      
      before(() => {
        Sinon.stub(modelcar, 'getAll').resolves(allCarsMock);
      });
  
      after(() => {
        Sinon.restore();
      });
  
      it('should return array', async () => {
        const carsFound = await modelcar.getAll();
        expect(carsFound).to.be.an('array');
        expect(carsFound).to.deep.equal(allCarsMock);
      });
    });

    describe('read one', () => {
      before(() => {
        Sinon.stub(modelcar, 'getById').resolves(oneCarMock);
      }
      );
      after(() => {
        Sinon.restore();
      }
      );
      it('should return one car', async () => {
        const carFound = await modelcar.getById('628fafea3b94a2894ec3f9e7');
        expect(carFound).to.be.an('object');
        expect(carFound).to.deep.equal(oneCarMock);
      }
      );
    });

})
