import CarService from "../../../services/CarService";
import { expect } from "chai";
import { allCarsMock, oneCarMock, newCarMock } from "../helpers/carMock";
import Sinon from "sinon";

describe('Test CarService', () => {
    describe('should create new car', () => {
        const modelcar = new CarService();

        before(() => {
            Sinon.stub(modelcar, "create").resolves(oneCarMock);
            
        })

        after(() => {
            Sinon.restore();
        })

        it('should create new car', async () => {
            const createCar = await modelcar.create(newCarMock);
            expect(createCar).to.be.an('object');
            expect(createCar).to.have.property('color');
            expect(createCar).to.deep.equal(oneCarMock);
        })

    })

})
