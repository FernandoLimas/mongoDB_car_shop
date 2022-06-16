import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import mongoose from 'mongoose';
import server from '../../../server';
import { carToUpdateMock, newCarMock, oneCarMock } from '../helpers/carMock';
import CarModel from '../../../models/CarModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa camada de Controller', () => {
  const MONGO_URL = 'mongodb://mongodb:27017/CarShop'
  const WRONG_ID = '1122331a112233b1122334c4'
  
  before(() => {
    mongoose.createConnection(MONGO_URL);
  });
  
  after(()=>{
    mongoose.connection.close();
  })
  
  server.startServer()
  
  const app = server.getApp();
  
  describe('Testa o controller CarController', () => {
    let model = new CarModel();
    const expectedKeys = [ '_id', 'model', 'year', 'color', 'buyValue', 'seatsQty', 'doorsQty' ]

    describe('Testa a rota POST/cars', () => {
      it('Testa o status de retorno da rota POST/cars', async () => {;    
        const response = await chai.request(app)
          .post('/cars')
          .send(newCarMock)
  
        expect(response.status).to.be.equal(201)
      })

      it('Testa se a rota POST/cars retorna um objeto com as chaves corretas', async () => {
        const response = await chai.request(app)
        .post('/cars')
        .send(newCarMock)

        const body = response.body
  
        expect(body).to.be.an('object')
        expect(body).to.include.all.keys(expectedKeys)
      })
    })

    describe('Testa a rota GET/cars', () => {
      it('Testa o status de retorno da rota GET/cars', async () => {;    
        const response = await chai.request(app)
          .get('/cars')
          .send()
  
        expect(response.status).to.be.equal(200)
      })

      it('Testa se a rota GET/cars retorna um array de objetos', async () => {
        const response = await chai.request(app)
        .get('/cars')
        .send()

        const body = response.body
  
        expect(body).to.be.an('array')
        expect(body[0]).to.be.an('object')
      })
    })

    describe('Testa a rota GET/cars/:id', () => {
      let requestMock: any;
      before(async () => {
        sinon.stub(model, 'readOne').resolves(oneCarMock);

        await chai.request(app).post('/cars').send(newCarMock)

        const mockRequest = await chai.request(app).get('/cars')
        requestMock = mockRequest.body;
      })

      after(() => {
        sinon.restore()
      })

      it('Testa o status de retorno da rota GET/cars/:id', async () => {;    
        const response = await chai.request(app)
          .get(`/cars/${requestMock[0]._id}`)
          
        expect(response.status).to.be.equal(200)
      })

      it('Testa se a rota GET/cars retorna um array de objetos', async () => {
        const response = await chai.request(app)
          .get(`/cars/${requestMock[0]._id}`)
        const body = response.body
  
        expect(body).to.be.an('object')
        expect(body).to.include.all.keys(expectedKeys)
      })

      describe('Testa caso erro de ID', () => {
        it('Testa se a requisição retorna uma mensagem de erro caso o id não tenha formato hexadecimal', async ()=> {
          const { body: { error} } = await chai.request(app)
          .get(`/cars/1`)

          expect(error).to.be.equal("Id must have 24 hexadecimal characters");
        });

        it('Testa se a requisição retorna um status 400 caso o id não tenha formato hexadecimal', async ()=> {
          const { status } = await chai.request(app)
          .get(`/cars/1`)

          expect(status).to.be.equal(400);
        });
  
        it('Testa se a requisição retorna um 404', async ()=> {
          const { status }  = await chai.request(app)
          .get(`/cars/${WRONG_ID}`)
  
          expect(status).to.be.equal(404);
        });
      })
    })

    describe('Testa a rota PUT/cars/:id', () => {      
      let requestMock: any;
      before(async () => {
        sinon.stub(model, 'update').resolves(oneCarMock);

        await chai.request(app).post('/cars').send(newCarMock)

        const mockRequest = await chai.request(app).get('/cars')
        requestMock = mockRequest.body;
      })

      after(() => {sinon.restore()})

      it('Testa se a requisição retorna um objeto e status 200', async ()=> {       
        const response = await chai.request(app)
        .put(`/cars/${requestMock[0]._id}`)
        .send(carToUpdateMock);

        expect(response.body).to.be.an('object');
        expect(response.status).to.be.equal(200);
      });

      it('Testa se a requisição retorna um objeto com as chaves corretas', async ()=> {
        const response = await chai.request(app)
        .put(`/cars/${requestMock[0]._id}`)
        .send(carToUpdateMock);

        expect(response.body).to.be.an('object');
        expect(response.body).to.include.all.keys(expectedKeys)
      });
    })
    
    describe('Testa a rota DELETE/cars/:id', () => {
      let requestMock: any;
      before(async () => {
        sinon.stub(model, 'delete').resolves(oneCarMock);

        await chai.request(app).post('/cars').send(newCarMock)

        const mockRequest = await chai.request(app).get('/cars')
        requestMock = mockRequest.body;
      })

      after(() => {sinon.restore()})

      it('Testa se a requisição retorna um 204 em caso se sucesso', async () => {
        const response = await chai.request(app)
						.delete(`/cars/${requestMock[0]._id}`)

					expect(response.status).to.be.equal(204);
      })
      it('Testa se a requisição retorna um 404 caso nao encontre o id', async () => {
        const response = await chai.request(app)
						.delete(`/cars/${WRONG_ID}`)

					expect(response.status).to.be.equal(404);
      })
      it('Testa se a requisição retorna um 400 e mensagem de erro caso id nao tenha formato hexadecimal ', async () => {
        const { status, body } = await chai.request(app)
						.delete(`/cars/1`)

            expect(status).to.be.equal(400)
            expect(body.error).to.be.equal("Id must have 24 hexadecimal characters");
      })
    })
  })
  
  it('Testa o status de retorno da rota GET/motorcycles', async () => {;    
    const response = await chai.request(app)
      .get('/motorcycles')

    expect(response.status).to.be.equal(200)
  })
})
