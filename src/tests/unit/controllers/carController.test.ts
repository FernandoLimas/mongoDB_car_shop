import chai from 'chai';
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import server from '../../../server';
import CarModel from '../../../models/CarModel';
import { newCarMock, oneCarMock, allCarsMock } from '../helpers/carMock';

chai.use(chaiHttp);

const { expect } = chai;

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
});
