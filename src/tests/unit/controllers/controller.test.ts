import mongoose from 'mongoose';
import Sinon from 'sinon';
import chaiHttp = require('chai-http');
import chai from 'chai';
import server from '../../../server';
import { Car } from '../../../interfaces/CarInterface';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import { carMock, newCarMock } from '../helpers/carMock'
import CarModel from '../../../models/CarModel';
import MotorcycleModel from '../../../models/MotoModel';
import { newMotorcycleMock, oneMotorcycleMock } from '../helpers/motoMock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Test controler', () => {
	before(function() {
		mongoose.createConnection('mongodb://mongodb:27017/CarShop');
	});

	after(function() {
		mongoose.connection.close();
	});

	server.startServer();

	const app = server.getApp();
	describe('Testa server', () => {
		let carModel = new CarModel();
	
		const updatedCar: Car = {
			"model": "String",
			"year": 1950,
			"color": "Black",
			"buyValue": 17700,
			"seatsQty": 4,
			"doorsQty": 4
		}

    describe('Getall', () => {
      it('Retorna um array', async ()=> {
        const response = await chai.request(app)
        .get('/cars')
    
        expect(response.body).to.be.an('array');
      });

			it('Router GET cars status(200)', async ()=> {
				const response = await chai.request(app)
				.get('/cars')
	
				expect(response.status).to.be.equal(200);
			});
	
	
			it('Item do array é um objeto', async ()=> {
				const response = await chai.request(app)
				.get('/cars')
	
				const getAllCars = response.body;
	
				getAllCars.forEach((car: Car) => {
					expect(car).to.be.an('object');
				});
			});
	
			it('Testa propriedades do objeto', async ()=> {
				const response = await chai.request(app)
				.get('/cars')
	
				const getAllCars = response.body;
	
				getAllCars.forEach((car: Car) => {
					expect(car).to.have.property('model');
					expect(car).to.have.property('year');
					expect(car).to.have.property('buyValue');
					expect(car).to.have.property('doorsQty');
					expect(car).to.have.property('color');
					expect(car).to.have.property('seatsQty');
				});
			});
		})

		describe('Testa create', () => {
			it('Testa rota POST statu(201)', async ()=> {
				const response = await chai.request(app)
				.post('/cars')
				.send(newCarMock)
	
				expect(response.status).to.be.equal(201);
			});
	
			it('Retorna um objeto', async ()=> {
				const response = await chai.request(app)
				.post('/cars')
				.send(newCarMock)
		
				expect(response.body).to.be.an('object');
			});
	
			it('Testa o objeto tem as propriedades devidas', async ()=> {
				const response = await chai.request(app)
				.post('/cars')
				.send(newCarMock)
	
				const newCar = response.body;
	
				expect(newCar).to.have.property('model');
				expect(newCar).to.have.property('year');
				expect(newCar).to.have.property('color');
				expect(newCar).to.have.property('buyValue');
				expect(newCar).to.have.property('seatsQty');
				expect(newCar).to.have.property('doorsQty');
				expect(newCar).to.have.property('_id');
			});
		})
	
		describe('testa readOne', () => {
			let mocks: any;
			before(async () => {
				Sinon
				.stub(carModel, 'readOne')
				.resolves({
					...carMock,
				} as Car);
	
				await chai.request(app)
				.post('/cars')
				.send(newCarMock);
	
				const mocksRequest = await chai.request(app)
				.get('/cars');
				mocks = mocksRequest.body;
			});
	
			after(() => {
				(carModel.readOne as Sinon.SinonStub).restore();
			});
	
			describe('Test router getById', () => {
        it('Retorna um objeto', async ()=> {
          const response = await chai.request(app)
          .get(`/cars/${mocks[0]._id}`)
      
          expect(response.body).to.be.an('object');
        });

				it('Rota /cars/:id retorna status(200)',  async ()=> {
					const response = await chai.request(app)
						.get(`/cars/${mocks[0]._id}`)
					
					expect(response.status).to.be.equal(200);
				});
		
		
				it('Testa o objeto tem as propriedades devidas', async ()=> {
					const response = await chai.request(app)
					.get(`/cars/${mocks[0]._id}`)
		
		
					expect(response.body).to.have.property('model');
					expect(response.body).to.have.property('year');
					expect(response.body).to.have.property('color');
					expect(response.body).to.have.property('buyValue');
					expect(response.body).to.have.property('seatsQty');
					expect(response.body).to.have.property('doorsQty');
				});
			})
			describe('Test Error', () => {
        it('Retorna status(404)', async ()=> {
          const response = await chai.request(app)
          .get(`/cars/1111111b111111f1114111f1`)
          
          expect(response.body.error).to.be
          .equal("Object not found");
        });
				it('Retorna status(400) caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.get(`/cars/1`)
			
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
			})
		})
		describe('Testa update', () => {
			let mocks: any;
			before(async () => {
				Sinon
				.stub(carModel, 'update')
				.resolves({
					...carMock,
				} as Car);
	
				await chai.request(app)
				.post('/cars')
				.send(newCarMock);
	
				const mocksRequest = await chai.request(app)
				.get('/cars');
				mocks = mocksRequest.body;
			});
	
			after(() => {
				(carModel.update as Sinon.SinonStub).restore();
			});
	
			describe('Testa em caso de sucesso', () => {
        it('Retorna um objeto', async ()=> {
          const response = await chai.request(app)
          .put(`/cars/${mocks[0]._id}`)
          .send(updatedCar);
      
          expect(response.body).to.be.an('object');
        });
        
				it('Testa a rota /cars/:id retorna status(200)',  async ()=> {
					const response = await chai.request(app)
						.put(`/cars/${mocks[0]._id}`)
						.send(updatedCar);
					
					expect(response.status).to.be.equal(200);
				});
		
		
				it('Testa o objeto tem as propriedades devidas', async ()=> {
					const response = await chai.request(app)
					.put(`/cars/${mocks[0]._id}`)
					.send(updatedCar);
		
		
					expect(response.body).to.have.property('color');
					expect(response.body).to.have.property('year');
					expect(response.body).to.have.property('model');
					expect(response.body).to.have.property('doorsQty');
					expect(response.body).to.have.property('buyValue');
					expect(response.body).to.have.property('seatsQty');
				});
			})
			describe('Test Error', () => {
				it('Retorna status(400) caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.put(`/cars/1`)
					.send(updatedCar);
					
			
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
				it('Testa se a requisição retorna erro 404 caso o id não seja encontrado', async ()=> {
					const response = await chai.request(app)
					.put(`/cars/1111111b111111f1114111f1`)
					.send(updatedCar);
					
					expect(response.body.error).to.be
					.equal("Object not found");
				});
			})
		})
	
		describe('Testa delete', () => {
			let mocks: any;
			before(async () => {
				Sinon
				.stub(carModel, 'delete')
				.resolves({
					...carMock,
				} as Car);
	
				await chai.request(app)
				.post('/cars')
				.send(newCarMock);
	
				const mocksRequest = await chai.request(app)
				.get('/cars');
				mocks = mocksRequest.body;
			});
	
			after(() => {
				(carModel.delete as Sinon.SinonStub).restore();
			});
	
			describe('Teste em caso de sucesso', () => {
				it('Rota /cars/:id retorna status(204)',  async ()=> {
					const response = await chai.request(app)
						.delete(`/cars/${mocks[0]._id}`)
					
					expect(response.status).to.be.equal(204);
				});
			})
	
			describe('Test Error', () => {
				it('Testa se a requisição retorna erro 400 caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.delete(`/cars/1`)		
	
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
				it('Testa se a requisição retorna erro 404 caso o id não seja encontrado', async ()=> {
					const response = await chai.request(app)
					.delete(`/cars/1111111b111111f1114111f1`)
					
					expect(response.body.error).to.be
					.equal("Object not found");
				});
			})
		})
	});
	
	describe('Testa Motorcycle Controller', () => {
		let motorcycleModel = new MotorcycleModel();
	
		const updatedMotorcycle: Motorcycle = {
			"model": "String",
			"year": 1950,
			"color": "Black",
			"buyValue": 17700,
			"category": 'Street',
			"engineCapacity": 400
		}
		describe('Test create motocycle', () => {
			it('Testa se a requisição POST para a rota /motorcycles retorna status 201', async ()=> {
				const response = await chai.request(app)
				.post('/motorcycles')
				.send(newMotorcycleMock)
	
				expect(response.status).to.be.equal(201);
			});
	
			it('Retorna um objeto', async ()=> {
				const response = await chai.request(app)
				.post('/motorcycles')
				.send(newMotorcycleMock)
		
				expect(response.body).to.be.an('object');
			});
	
			it('Testa o objeto tem as propriedades devidas', async ()=> {
				const response = await chai.request(app)
				.post('/motorcycles')
				.send(newMotorcycleMock)
	
				const newCar = response.body;
	
				expect(newCar).to.have.property('model');
				expect(newCar).to.have.property('year');
				expect(newCar).to.have.property('color');
				expect(newCar).to.have.property('buyValue');
				expect(newCar).to.have.property('category');
				expect(newCar).to.have.property('engineCapacity');
				expect(newCar).to.have.property('_id');
			});
		})
		describe('Test read', () => {
			it('Rota /motorcycles retorna status 200', async ()=> {
				const response = await chai.request(app)
				.get('/motorcycles')
	
				expect(response.status).to.be.equal(200);
			});
	
			it('Testa se a requisição retorna um array', async ()=> {
				const response = await chai.request(app)
				.get('/motorcycles')
		
				expect(response.body).to.be.an('array');
			});
	
			it('Testa se cada tem do array é um objeto', async ()=> {
				const response = await chai.request(app)
				.get('/motorcycles')
	
				const allMotorcyles = response.body;
	
				allMotorcyles.forEach((moto: Motorcycle) => {
					expect(moto).to.be.an('object');
				});
			});
	
			it('Testa se cada objeto tem as propriedades devidas', async ()=> {
				const response = await chai.request(app)
				.get('/motorcycles')
	
				const allMotorcycles = response.body;
	
				allMotorcycles.forEach((moto: Motorcycle) => {
					expect(moto).to.have.property('model');
					expect(moto).to.have.property('year');
					expect(moto).to.have.property('color');
					expect(moto).to.have.property('buyValue');
					expect(moto).to.have.property('category');
					expect(moto).to.have.property('engineCapacity');
				});
			});
		})
	
		describe('Test readOne', () => {
			let motoMocks: any;
			before(async () => {
		    Sinon
		    .stub(motorcycleModel, 'readOne')
		    .resolves({
		      ...oneMotorcycleMock,
		    } as Motorcycle);
	
				await chai.request(app)
				.post('/motorcycles')
				.send(newMotorcycleMock);
	
				const mocksRequest = await chai.request(app)
				.get('/motorcycles');
				motoMocks = mocksRequest.body;
		  });
	
		  after(() => {
		    (motorcycleModel.readOne as Sinon.SinonStub).restore();
		  });
	
			describe('Test sucesso', () => {
				it('Testa se a requisição GET para a rota /motorcycles/:id retorna status 200',  async ()=> {
					const response = await chai.request(app)
						.get(`/motorcycles/${motoMocks[0]._id}`)
					
					expect(response.status).to.be.equal(200);
				});
		
				it('Testa se a requisição retorna um objeto', async ()=> {
					const response = await chai.request(app)
					.get(`/motorcycles/${motoMocks[0]._id}`)
			
					expect(response.body).to.be.an('object');
				});
		
				it('Testa o objeto tem as propriedades devidas', async ()=> {
					const response = await chai.request(app)
					.get(`/motorcycles/${motoMocks[0]._id}`)
		
		
					expect(response.body).to.have.property('model');
					expect(response.body).to.have.property('year');
					expect(response.body).to.have.property('color');
					expect(response.body).to.have.property('buyValue');
					expect(response.body).to.have.property('category');
					expect(response.body).to.have.property('engineCapacity');
				});
			})
			describe('Test Error', () => {
				it('Testa se a requisição retorna erro 400 caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.get(`/motorcycles/1`)
			
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
				it('Testa se a requisição retorna erro 404 caso o id não seja encontrado', async ()=> {
					const response = await chai.request(app)
					.get(`/motorcycles/1111111b111111f1114111f1`)
					
					expect(response.body.error).to.be
					.equal("Object not found");
				});
			})
		});

		describe('Test update', () => {
			let motoMocks: any;
			before(async () => {
		    Sinon
		    .stub(motorcycleModel, 'update')
		    .resolves({
		      ...oneMotorcycleMock,
		    } as Motorcycle);
	
				await chai.request(app)
				.post('/motorcycles')
				.send(newCarMock);
	
				const mocksRequest = await chai.request(app)
				.get('/motorcycles');
				motoMocks = mocksRequest.body;
		  });
	
		  after(() => {
		    (motorcycleModel.update as Sinon.SinonStub).restore();
		  });
	
			describe('Test sucesso', () => {
				it('Testa se a requisição PUT para a rota /cars/:id retorna status 200',  async ()=> {
					const response = await chai.request(app)
						.put(`/motorcycles/${motoMocks[0]._id}`)
						.send(updatedMotorcycle);
					
					expect(response.status).to.be.equal(200);
				});
		
				it('Testa se a requisição retorna um objeto', async ()=> {
					const response = await chai.request(app)
					.put(`/motorcycles/${motoMocks[0]._id}`)
					.send(updatedMotorcycle);
			
					expect(response.body).to.be.an('object');
				});
		
				it('Testa o objeto tem as propriedades devidas', async ()=> {
					const response = await chai.request(app)
					.put(`/motorcycles/${motoMocks[0]._id}`)
					.send(updatedMotorcycle);
		
		
					expect(response.body).to.have.property('model');
					expect(response.body).to.have.property('year');
					expect(response.body).to.have.property('color');
					expect(response.body).to.have.property('buyValue');
					expect(response.body).to.have.property('category');
					expect(response.body).to.have.property('engineCapacity');
				});
			})
			describe('Test Error', () => {
				it('Testa se a requisição retorna erro 400 caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.put(`/motorcycles/1`)
					.send(updatedMotorcycle);
					
			
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
				it('Testa se a requisição retorna erro 404 caso o id não seja encontrado', async ()=> {
					const response = await chai.request(app)
					.put(`/motorcycles/1111111b111111f1114111f1`)
					.send(updatedMotorcycle);
					
					expect(response.body.error).to.be
					.equal("Object not found");
				});
			})
		})
	
		describe('delete()', () => {
			let motoMocks: any;
			before(async () => {
		    Sinon
		    .stub(motorcycleModel, 'delete')
		    .resolves({
		      ...oneMotorcycleMock,
		    } as Motorcycle);
	
				await chai.request(app)
				.post('/motorcycles')
				.send(newCarMock);
	
				const mocksRequest = await chai.request(app)
				.get('/motorcycles');
				motoMocks = mocksRequest.body;
		  });
	
		  after(() => {
		    (motorcycleModel.delete as Sinon.SinonStub).restore();
		  });
	
			describe('Test Error', () => {
				it('Testa se a requisição retorna erro 400 caso o id não tenha formato hexadecimal', async ()=> {
					const response = await chai.request(app)
					.delete(`/motorcycles/1`)		
	
					expect(response.body.error).to.be
					.equal("Id must have 24 hexadecimal characters");
				});
	
				it('Testa se a requisição retorna erro 404 caso o id não seja encontrado', async ()=> {
					const response = await chai.request(app)
					.delete(`/motorcycles/1111111b111111f1114111f1`)
					
					expect(response.body.error).to.be
					.equal("Object not found");
				});
			})
			
			describe('Test sucesso', () => {
				it('Testa se a requisição DELETE para a rota /cars/:id retorna status 204',  async ()=> {
					const response = await chai.request(app)
						.delete(`/motorcycles/${motoMocks[0]._id}`)
					
					expect(response.status).to.be.equal(204);
				});
			})
	
		})
	});
})
