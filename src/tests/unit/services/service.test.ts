import * as sinon from 'sinon';
import chai from 'chai';
import { allCarsMock, invalidNewCarMock, newCarMock, oneCarMock, updatedCarMock } from '../helpers/carMock';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';

const { expect } = chai;

const requiredKeys = ["_id", "model", "year", "color", "buyValue", "seatsQty", "doorsQty"];
const newCarRequiredKeys = ["model", "year", "color", "buyValue", "seatsQty", "doorsQty"];

describe('Testa camada CarServices', () => {
  const CAR_ID = '628f7b9ee2be6772f5e86099'
  let model = new CarModel();
  let service = new CarService(model);
  

  describe('Casos de sucesso', () => {
    describe('Testa se a service getAll()', () => {
      before(async () => {
        sinon.stub(model, 'read')
          .resolves(allCarsMock)
      })
      after(() => {
           sinon.restore();
          })
  
      it('retorna um array', async () => {
        const response = await service.getAll();
  
        expect(response).to.be.an('array');
        expect(response).to.be.deep.equal(allCarsMock)
      });
    })
  
    describe('Testa se a service getById()', () => {
      before(async () => {
        sinon.stub(model, 'readOne')
          .resolves(oneCarMock)
      })
      after(() => {
           sinon.restore();
          })
  
      it('retorna um objeto', async () => {
        const response = await service.getById(CAR_ID);
  
        expect(response).to.be.an('object');
      });
  
      it('possue as chaves corretas', async () => {
        const response = await service.getById(CAR_ID);
  
        expect(response).to.be.have.all.keys(requiredKeys);
      });
    })

    describe('Testa se a service create()', () => {
      before(async () => {
        sinon.stub(model, 'create')
          .resolves(newCarMock)
      })
      after(() => {
           sinon.restore();
          })
  
      it('retorna um objeto', async () => {
        const response = await service.create(oneCarMock);
  
        expect(response).to.be.an('object');
      });
  
      it('possue as chaves corretas', async () => {
        const response = await service.create(oneCarMock);
  
        expect(response).to.be.have.all.keys(newCarRequiredKeys);
      });
    })

    describe('Testa se a service remove()', () => {
      before(async () => {
        sinon.stub(model, 'delete')
          .resolves(oneCarMock)
      })
      after(() => {
           sinon.restore();
          })
  
      it('retorna um objeto', async () => {
        const response = await service.delete(CAR_ID)
        
        expect(response).to.exist;
      });
    })
    
    describe('Testa se a service update()', () => {
      before(async () => {
        sinon.stub(model, 'update')
          .resolves(updatedCarMock)
      })
      after(() => {
          sinon.restore();
          })

      it('retorna um objeto', async () => {
        const response = await service.update(CAR_ID, updatedCarMock)
        
        expect(response).to.be.an('object');
      });

      it('retorna as chaves corretas', async () => {
        const response = await service.update(CAR_ID, updatedCarMock)
        
        expect(response).to.be.deep.equal(updatedCarMock);
      });
    })
  })

  describe('Casos de erro', () => {
    describe('Testa se a service create()', () => {
      before(async () => {
        sinon.stub(model, 'create')
          .resolves()
      })
      after(() => {
           sinon.restore();
          })
  
      it('retorna um objeto', async () => {
        const response = await service.create(invalidNewCarMock);
  
        expect(response).to.be.an('object');
      });
  
      it('retorna um erro', async () => {
        const response = await service.create(invalidNewCarMock);
        
        expect(response).to.be.have.property('error')
      });
    })
  })
});
