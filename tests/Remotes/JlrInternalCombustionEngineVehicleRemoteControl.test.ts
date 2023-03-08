import { createMock } from 'ts-auto-mock'
import { CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'
import { JlrInternalCombustionEngineVehicleRemoteControl } from '../../src/Remotes/JlrInternalCombustionEngineVehicleRemoteControl'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CommandAuthenticationService, commandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'

describe('JLR Internal Combustion Engine Vehicle Remote Control', () => {
    describe('Turn on engine', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    'not important', 
                    mockVehicleRemoteAuthenticator, 
                    mockCommandIceVehicleService,
                    createMock<CommandAuthenticationService>())

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
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    expectedDeviceId,
                    'not important',
                    createMock<VehicleRemoteAuthenticator>(),
                    mockCommandIceVehicleService,
                    createMock<CommandAuthenticationService>())

                // Act
                await remote.turnOnEngine()
                
                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
        })

        test.each(['vin1', 'vin2','vin3'])
            ('uses Vin `%s`', async (expectedVin) => {

                //Arrange
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    expectedVin,
                    createMock<VehicleRemoteAuthenticator>(),
                    mockCommandIceVehicleService,
                    createMock<CommandAuthenticationService>())

                //Act
                await remote.turnOnEngine()

                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
                })
        })

    describe('Gets REON token', () => {
        test.each(['real token', 'not a real token', 'garbage'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    'not important',
                    mockVehicleRemoteAuthenticator,
                    createMock<CommandIceVehicleService>(),
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()
                
                // Assert
                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })


        test.each(['some device id', 'not a real device id', 'dani and will pairing innit'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                
                // Act
                
                // Assert
            })
        
        test.each(['hello world', 'Vin Diesel', 'fake VIN'])
            ('uses VIN `%s`', async (expectedVin) => {
                // Arrange
                
                // Act
                
                // Assert
            })
        
        test.each(['hello world', 'useless ID', 'fake ID'])
            ('uses user ID `%s`', async (expectedUserID) => {
                // Arrange
                
                // Act
                
                // Assert
            })
        
        test.each(['hello world', 'PIN Diesel', 'fake PIN'])
            ('uses user PIN `%s`', async (expectedUserPin) => {
                // Arrange
                
                // Act
                
                // Assert
            })

        test.each(['real token', 'not a real token', 'garbage'])
            ('uses REON command token `%s`', async (expectedReonCommandToken) => { 
                // Arrange
                
                // Act
                
                // Assert
            })
    })

    describe('Turn off engine', () => {})

    describe('Get engine state',() => {})
})
