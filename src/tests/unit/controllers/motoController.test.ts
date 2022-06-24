import chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import server from '../../../server';
import MotoModel from '../../../models/MotoModel';
import { newMotorcycleMock, oneMotorcycleMock, allMotorcyclesMock } from '../helpers/motoMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test motoController', () => {
  describe('request new car', () => {
    let motoModel = new MotoModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(motoModel.model, 'create').resolves(oneMotorcycleMock);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should new moto', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/motorcycles')
        .send(newMotorcycleMock)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneMotorcycleMock);
          return res.body;
      });
    });
  
    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/motorcycles')
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
    let motoModel = new MotoModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(motoModel.model, 'find').resolves(allMotorcyclesMock as any[]);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an array', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles')
        .send(allMotorcyclesMock)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.deep.equal(allMotorcyclesMock);
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/motorcycles')
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
    let motoModel = new MotoModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(motoModel.model, 'findOne').resolves(oneMotorcycleMock as any);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an object', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/motorcycles/${oneMotorcycleMock._id}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneMotorcycleMock);
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/motorcycles/${oneMotorcycleMock.model}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  });

  describe('request update', () => {
    let motoModel = new MotoModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(motoModel.model, 'findOneAndUpdate').resolves(oneMotorcycleMock as any);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 200 and an object', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put(`/motorcycles/${oneMotorcycleMock._id}`)
        .send(oneMotorcycleMock)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal(oneMotorcycleMock);
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put(`/motorcycles/${oneMotorcycleMock._id}`)
        .send({})
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  });

  describe('request delete', () => {
    let motoModel = new MotoModel();
    let chaiHttpResponse: Response;
    let app = server.getApp();
  
    before(() => {
      sinon.stub(motoModel.model, 'remove').resolves(oneMotorcycleMock as any);
    });
  
    after(() => {
      sinon.restore();
    });
  
    it('should return status 204 and an object', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/motorcycles/${oneMotorcycleMock._id}`)
        .then(res => {
          expect(res).to.have.status(204);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal({});
          return res.body;
      });
    });

    it('should return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/motorcycles/123`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          return res.body;
        });
    });
  });
})
