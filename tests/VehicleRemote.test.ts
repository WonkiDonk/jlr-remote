import { createMock } from 'ts-auto-mock'
import { QueryVehicleInformationService } from '../src/Services/QueryVehicleInformationService'
import { VehicleAttributes } from '../src/JaguarLandRover/ServiceTypes'
import { VehicleRemote } from '../src/Remotes/VehicleRemote'

describe('Get vehicle attributes', () => {
    it('returns vehicle attributes', async () => {
        const attributes = createMock<VehicleAttributes>()
        const mockGetVehicleAttributes = jest.fn()
        mockGetVehicleAttributes.mockImplementation(() => Promise.resolve(attributes))
        
        const mockService = createMock<QueryVehicleInformationService>()
        mockService.getVehicleAttributes = mockGetVehicleAttributes

        const remote = new VehicleRemote(mockService)

        const response = await remote.getVehicleAttributes()

        expect(response).toBe(attributes)
    })
}) 
