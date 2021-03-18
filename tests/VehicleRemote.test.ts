import { createMock } from 'ts-auto-mock'
import { QueryVehicleInformationService } from '../src/Services/QueryVehicleInformationService'
import { VehicleAttributes } from '../src/JaguarLandRover/ServiceTypes'
import { VehicleRemote } from '../src/Remotes/VehicleRemote'

describe('Vehicle Remote', () => {
    describe('Get vehicle attributes', () => {
        test('returns vehicle attributes', async () => {
            const attributes = createMock<VehicleAttributes>()
            const mockGetVehicleAttributes = jest.fn()
            mockGetVehicleAttributes.mockImplementation(() => Promise.resolve(attributes))
            
            const mockService = createMock<QueryVehicleInformationService>()
            mockService.getVehicleAttributes = mockGetVehicleAttributes
    
            const remote = new VehicleRemote('', '', mockService)
    
            const response = await remote.getVehicleAttributes()
    
            expect(response).toBe(attributes)
        })

        test('uses the access token', () => {})

        test.each(['hello world', 'cat', 'dog'])
            ('uses the device ID `%s`', async (expectedDeviceId) => {
            // Arrange
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new VehicleRemote(expectedDeviceId, '', mockService)

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String))
        })

        test.each(['hello world', 'dog', 'cat'])
            ('uses the VIN `%s`', async (expectedVIN) => {
            // Arrange
            
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new VehicleRemote('', expectedVIN, mockService)
            // Act
            await remote.getVehicleAttributes()
            // Assert
            expect(mockService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVIN)
        })
    }) 
})
