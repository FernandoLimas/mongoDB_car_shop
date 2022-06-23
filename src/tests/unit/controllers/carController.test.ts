import chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import server from '../../../server';
import CarModel from '../../../models/CarModel';
import { newCarMock, oneCarMock, allCarsMock } from '../helpers/carMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test carController', () => {
  describe('request new car', () => {
    let carModel = new CarModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(carModel.model, 'create').resolves(oneCarMock);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should new car', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send(newCarMock)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneCarMock);
          return res.body;
      });
    });
  
    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send({})
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  
  });
  
  describe('request find all', () => {
    let carModel = new CarModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(carModel.model, 'find').resolves(allCarsMock as any[]);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an array', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/cars')
        .send(allCarsMock)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.deep.equal(allCarsMock);
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send([{}])
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  });
  
  describe('request findOne', () => {
    let carModel = new CarModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(carModel.model, 'findOne').resolves(oneCarMock as any);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an object', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/cars/${oneCarMock._id}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneCarMock);
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/cars/${oneCarMock.model}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  });

  describe('request update', () => {
    let carModel = new CarModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(carModel.model, 'findOneAndUpdate').resolves(oneCarMock as any);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an object', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put(`/cars/${oneCarMock._id}`)
        .send(oneCarMock)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneCarMock);
          return res.body;
      });
    });
  });
})
