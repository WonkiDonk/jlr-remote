import { createMock } from 'ts-auto-mock'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { CurrentVehicleStatusV3, VehicleAttributes, VehicleStatus } from '../../src/JaguarLandRover/ServiceTypes'
import { CurrentVehicleStatus, VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { JlrVehicleRemoteInformationBuilder } from './JlrVehicleRemoteInformation.builder'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'

describe('JLR Vehicle Remote Information', () => {
    describe('Get vehicle attributes', () => {
        test('returns vehicle attributes', async () => {
            // Arrange
            const expectedAttributes = createMock<VehicleAttributes>()          
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            mockQueryVehicleInformationService.getVehicleAttributes = jest.fn(() => Promise.resolve(expectedAttributes))

            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.queryVehicleInformationService = mockQueryVehicleInformationService
            
            const remote = builder.build()

            // Act
            const response = await remote.getVehicleAttributes()
    
            // Assert
            expect(response).toBe(expectedAttributes)
        })

        test.each(['hello world', 'example token', 'this token is not even real'])
            ('uses the access token `%s`', async (expectedAccessToken: string) => {
            // Arrange
            const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
            mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleAttributes).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String))
        })

        test.each(['hello world', 'cat', 'dog'])
            ('uses the device ID `%s`', async (expectedDeviceId) => {
            // Arrange
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.deviceId = expectedDeviceId
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String))
        })

        test.each(['hello world', 'dog', 'cat'])
            ('uses the VIN `%s`', async (expectedVin) => {
            // Arrange
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.vin = expectedVin
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleAttributes()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleAttributes).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVin)
        })
    })
    
    describe('Get vehicle status', () => {
        test('returns vehicle status', async () => {
            // Arrange
            const currentVehicleStatusV3 = createMock<CurrentVehicleStatusV3>()
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(currentVehicleStatusV3))

            const expectedVehicleStatus = createMock<CurrentVehicleStatus>()
            const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()
            mockVehicleStatusMapper.map = jest.fn((received) =>
                received === currentVehicleStatusV3
                    ? expectedVehicleStatus
                    : createMock<CurrentVehicleStatus>())

            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.queryVehicleInformationService = mockQueryVehicleInformationService
            builder.vehicleStatusMapper = mockVehicleStatusMapper

            const remote = builder.build()

            // Act
            const response = await remote.getVehicleStatus()

            // Assert
            expect(response).toBe(expectedVehicleStatus)
        })  

        test.each(['hello world', 'fake access token', 'real access token, honest, gov!'])
            ('uses the access token `%s`', async (expectedAccessToken: string) => {
            // Arrange
            const mockAuthenticator = createMock<VehicleRemoteAuthenticator>()
            mockAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.vehicleRemoteAuthenticator = mockAuthenticator
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleStatus()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String))
        })

        test.each(['Hello World', 'Fake Id', 'exampleId'])
            ('uses the device ID `%s`', async (expectedDeviceId: string) => {   
            // Arrange
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.deviceId = expectedDeviceId
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleStatus()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String))
        })

        test.each(['some vin', 'another vin', 'this is not a VIN!'])
            ('uses the VIN `%s`', async (expectedVin: string) => {
            // Arrange
            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            const builder = new JlrVehicleRemoteInformationBuilder()
            builder.vin = expectedVin
            builder.queryVehicleInformationService = mockQueryVehicleInformationService

            const remote = builder.build()

            // Act
            await remote.getVehicleStatus()

            // Assert
            expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVin)
        })
    })
})
