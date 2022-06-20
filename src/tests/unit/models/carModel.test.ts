import CarModel from "../../../models/CarModel";
import { expect } from "chai";
import { allCarsMock } from "../helpers/carMock";
import Sinon from "sinon";

describe('Test CarModel', () => {
    describe('Get all cars', () => {
        const modelcar = new CarModel();

        before(() => {
            Sinon.stub(modelcar, "read").resolves(allCarsMock);
            
        })

        after(() => {
            Sinon.restore();
        })

        it('should return all cars', async () => {
            const getCars = await modelcar.read();
            expect(getCars).to.be.an('array');
            expect(getCars).to.have.lengthOf(allCarsMock.length);
            expect(getCars).to.deep.equal(allCarsMock);
        }
        )

    })
})
