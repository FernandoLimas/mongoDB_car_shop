// import motoService from "../../../services/MotoService";
import MotoService from "../../../services/MotoService";
import { expect } from "chai";
import { allCarsMock, oneCarMock, newCarMock } from "../helpers/carMock";
import { oneMotorcycleMock, newMotorcycleMock, allMotorcyclesMock } from "../helpers/motoMock";
import Sinon, { SinonStub } from "sinon";

describe('test MotoService', () => {
    const modelmoto = new MotoService();
    describe('should create new motorcycle', () => {
        before(() => {
            Sinon.stub(modelmoto, 'create').resolves(oneMotorcycleMock as any);
        }
        );
        after(() => {
            (modelmoto.create as SinonStub).restore();
        }
        );
        it('should create new motorcycle', async () => {
            const createMoto = await modelmoto.create(newMotorcycleMock as any);
            expect(createMoto).to.be.an('object');
            expect(createMoto).to.have.property('color');
            expect(createMoto).to.deep.equal(oneMotorcycleMock);
        });
    });

    describe('read', () => {
        before(() => {
            Sinon.stub(modelmoto, 'getAll').resolves(allMotorcyclesMock as any);
        }
        );
        after(() => {
            Sinon.restore();
        }
        );
        it('should return array', async () => {
            const motorcyclesFound = await modelmoto.getAll();
            expect(motorcyclesFound).to.be.an('array');
            expect(motorcyclesFound).to.deep.equal(allMotorcyclesMock);
        }
        );
    });
})