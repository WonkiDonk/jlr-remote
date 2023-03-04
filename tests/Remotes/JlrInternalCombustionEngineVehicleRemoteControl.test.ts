import { createMock } from 'ts-auto-mock'
import { CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'
import { JlrInternalCombustionEngineVehicleRemoteControl } from '../../src/Remotes/JlrInternalCombustionEngineVehicleRemoteControl'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { Vehicle } from '../../src/JaguarLandRover/ServiceTypes'

describe('JLR Internal Combustion Engine Vehicle Remote Control', () => {
    describe('Turn on engine', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(mockVehicleRemoteAuthentication, mockCommandIceVehicleService)

                // Act
                await remote.turnOnEngine()

                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
        })

        test.each(['hello world', 'fake ID', 'bad ID'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getDeviceID = jest.fn(() => Promise.resolve(expectedDeviceId))

                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(mockVehicleRemoteAuthentication, mockCommandIceVehicleService)

                // Act
                await remote.turnOnEngine()
                
                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String),
                expect.any(String))
        })

        test('uses vin', () => {}) 
        })

        test('uses REON token', () => {})
        })

    describe('Turn off engine', () => {})

    describe('Get engine state',() => {})

