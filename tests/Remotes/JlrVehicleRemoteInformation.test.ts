import { createMock } from 'ts-auto-mock'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { CurrentVehicleStatusV3, VehicleAttributes } from '../../src/JaguarLandRover/ServiceTypes'
import { JlrVehicleRemoteInformation } from '../../src/Remotes/JlrVehicleRemoteInformation'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'

describe('JLR Vehicle Remote Information', () => {
    describe('Get vehicle attributes', () => {
        test('returns vehicle attributes', async () => {
            // Arrange
            const attributes = createMock<VehicleAttributes>()
            const mockGetVehicleAttributes = jest.fn()
            mockGetVehicleAttributes.mockImplementation(() => Promise.resolve(attributes))
            
            const mockService = createMock<QueryVehicleInformationService>()
            mockService.getVehicleAttributes = mockGetVehicleAttributes
            
            const remote = new JlrVehicleRemoteInformation('', '', createMock<VehicleRemoteAuthenticator>(), mockService)

            // Act
            const response = await remote.getVehicleAttributes()
    
            // Assert
            expect(response).toBe(attributes)
        })

        test.each(['hello world', 'example token', 'this token is not even real'])
            ('uses the access token `%s`', async (expectedAccessToken: string) => {
            // Arrange
            const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
            const mockGetAccessToken = jest.fn()
            mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

            mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation('', '', mockVehicleRemoteAuthentication, mockService)

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockService.getVehicleAttributes).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String))
        })

        test.each(['hello world', 'cat', 'dog'])
            ('uses the device ID `%s`', async (expectedDeviceId) => {
            // Arrange
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation(expectedDeviceId, '', createMock<VehicleRemoteAuthenticator>(), mockService)

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String))
        })

        test.each(['hello world', 'dog', 'cat'])
            ('uses the VIN `%s`', async (expectedVin) => {
            // Arrange
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation('', expectedVin, createMock<VehicleRemoteAuthenticator>(), mockService)

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVin)
        })
    })
    
    describe('Get vehicle status', () => {
        test('returns vehicle status', async () => {
            // Arrange
            const status = createMock<CurrentVehicleStatusV3>()
            const mockService = createMock<QueryVehicleInformationService>()
            const mockGetVehicleStatusV3 = jest.fn()
            mockService.getVehicleStatusV3 = mockGetVehicleStatusV3
            mockGetVehicleStatusV3.mockImplementation( () => Promise.resolve(status))

            const remote = new JlrVehicleRemoteInformation('', '', createMock<VehicleRemoteAuthenticator>(), mockService)

            // Act
            const response = await remote.getVehicleStatus()

            // Assert
            expect(response).toBe(status)
        })  

        test.each(['hello world', 'fake access token', 'real access token, honest, gov!'])
            ('uses the access token `%s`', async (expectedAccessToken: string) => {
            // Arrange
            const mockGetAccessToken = jest.fn()
            mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

            const mockAuthenticator = createMock<VehicleRemoteAuthenticator>()
            mockAuthenticator.getAccessToken = mockGetAccessToken

            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation('', '', mockAuthenticator, mockService)

            // Act
            await remote.getVehicleStatus()

            // Assert
            expect(mockService.getVehicleStatusV3).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String))
        })

        test.each(['Hello World', 'Fake Id', 'exampleId'])
            ('uses the device ID `%s`', async (expectedDeviceId: string) => {   
            // Arrange
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation(expectedDeviceId, '', createMock<VehicleRemoteAuthenticator>(), mockService)

            // Act
            await remote.getVehicleStatus()

            // Assert
            expect(mockService.getVehicleStatusV3).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String)
            )
        })

        test.each(['some vin', 'another vin', 'this is not a VIN!'])
            ('uses the VIN `%s`', async (expectedVin: string) => {
            // Arrange
            const mockService = createMock<QueryVehicleInformationService>()
            const remote = new JlrVehicleRemoteInformation('', expectedVin, createMock<VehicleRemoteAuthenticator>(), mockService)
            
            // Act
            await remote.getVehicleStatus()
            
            // Assert
            expect(mockService.getVehicleStatusV3).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVin
            )
        })
    })
})
