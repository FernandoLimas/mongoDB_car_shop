import CarModel from "../../../models/CarModel";
import { expect } from "chai";
import { allCarsMock, oneCarMock, newCarMock, updatedCarMock } from "../helpers/carMock";
import Sinon from "sinon";

describe('Test CarModel', () => {
    const modelcar = new CarModel();

    describe('create', () => {

        before(() => {
            Sinon.stub(modelcar, "create").resolves(oneCarMock);

        })

        after(() => {
            Sinon.restore();
        })

        it('should return new car', async () => {
            const newCar = await modelcar.create(oneCarMock);
            expect(newCar).to.be.an('object');
            expect(newCar).to.deep.equal(oneCarMock);
            expect(newCar).to.have.property('_id');
        })

    });

    describe('read', () => {
        before(() => {
          Sinon.stub(modelcar, 'read').resolves(allCarsMock);
        });
    
        after(() => {
          Sinon.restore();
        });
    
        it('should return array', async () => {
          const carsFound = await modelcar.read();
          expect(carsFound).to.be.an('array');
          expect(carsFound).to.deep.equal(allCarsMock);
        });
      });

      describe('readOne', () => {
        before(() => {
          Sinon.stub(modelcar, 'readOne').resolves(oneCarMock);
        });
    
        after(() => {
          Sinon.restore();
        });
    
        it('should return object', async () => {
          const carFound = await modelcar.readOne(oneCarMock._id);
          expect(carFound).to.be.an('object');
          expect(carFound).to.deep.equal(oneCarMock);
        });
      });

      describe('update', () => {
        before(() => {
          Sinon.stub(modelcar, 'update').resolves(oneCarMock);
        });
    
        after(() => {
          Sinon.restore();
        });
    
        it('should return object', async () => {
          const carUpdated = await modelcar.update(oneCarMock._id, oneCarMock);
          expect(carUpdated).to.be.an('object');
          expect(carUpdated).to.deep.equal(oneCarMock);
        });
      });

})
