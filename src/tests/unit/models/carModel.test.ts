import CarModel from "../../../models/CarModel";
import { expect } from "chai";
import { allCarsMock, oneCarMock, newCarMock, updatedCarMock } from "../helpers/carMock";
import mongoose from "mongoose";
import Sinon from "sinon";




describe('Test CarModel', () => {
  const modelCar = new CarModel();
  const _id = '628fafea3b94a2894ec3f9e7';

    before(async (done) => {
        mongoose.connect('mongodb://localhost/testDatabase');
        const db = mongoose.connection;
        done()
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close();
            done();
        });
    });

    describe('Car Model', () => {
        it('should exist modelCar', () => {
            expect(modelCar).to.exist;
        });

        it('should return new car', async () => {
        
            const newCar = await modelCar.create(newCarMock);
            expect(newCar._id).to.exist;
            expect(newCar).to.have.property('color');
            expect(newCar).to.have.property('model');
            expect(newCar).to.have.property('year');
            expect(newCar).to.have.property('buyValue');
            expect(newCar).to.have.property('doorsQty');
            expect(newCar).to.have.property('seatsQty');
        })

        it('should get by id', async () => {
            const getCar = await modelCar.readOne(_id);
            expect(getCar).to.be.a('string');
        })


        it('should return all cars', async () => {
            const getCars = await modelCar.read();
            expect(getCars).to.be.an('array');
        })

        it('should update car', async () => {
            
            const result = await modelCar.create(newCarMock);

            const updated = await modelCar.update(_id, updatedCarMock) as any;
            expect(_id, updated).to.exist;
        });

    });
});
