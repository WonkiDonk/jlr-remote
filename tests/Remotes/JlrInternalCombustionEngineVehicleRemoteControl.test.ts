import { createMock } from 'ts-auto-mock'
import { commandIceVehicleService, CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'
import { JlrInternalCombustionEngineVehicleRemoteControl } from '../../src/Remotes/JlrInternalCombustionEngineVehicleRemoteControl'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CommandAuthenticationService, commandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { Vehicle } from '../../src/JaguarLandRover/ServiceTypes'
import { commandVehicleService } from '../../src/Services/CommandVehicleService'

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
                    'not important',
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
                    'not important',
                    'not important',
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
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    expectedDeviceId,
                    'not important',
                    'not important',
                    'not important',
                    createMock<VehicleRemoteAuthenticator>(),
                    createMock<CommandIceVehicleService>(),
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()
                
                // Assert

                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })
        
        test.each(['hello world', 'Vin Diesel', 'fake VIN'])
            ('uses VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    expectedVin,
                    'not important',
                    'not important',
                    createMock<VehicleRemoteAuthenticator>(),
                    createMock<CommandIceVehicleService>(),
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()

                // Assert
                
                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String),
                    expect.any(String)
                )
            })
        
        test.each(['hello world', 'useless ID', 'fake ID'])
            ('uses user ID `%s`', async (expectedUserID) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    'not important',
                    expectedUserID,
                    'not important',
                    createMock<VehicleRemoteAuthenticator>(),
                    createMock<CommandIceVehicleService>(),
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()

                // Assert

                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserID,
                    expect.any(String))
            })
        
        test.each(['hello world', 'PIN Diesel', 'fake PIN'])
            ('uses user PIN `%s`', async (expectedUserPin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    'not important',
                    'not important',
                    expectedUserPin,
                    createMock<VehicleRemoteAuthenticator>(),
                    createMock<CommandIceVehicleService>(),
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()

                // Assert
                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserPin)
            })

        test.each(['real token', 'not a real token', 'garbage'])
            ('uses REON command token `%s`', async (expectedReonCommandToken) => { 
                // Arrange
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                mockCommandAuthenticationService.getReonToken = jest.fn(() => Promise.resolve({token: expectedReonCommandToken}))

                const remote = new JlrInternalCombustionEngineVehicleRemoteControl(
                    'not important',
                    'not important',
                    'not important',
                    'not important',
                    createMock<VehicleRemoteAuthenticator>(),
                    mockCommandIceVehicleService,
                    mockCommandAuthenticationService)

                // Act
                await remote.turnOnEngine()

                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedReonCommandToken)
            })
    })

    describe('Turn off engine', () => {})

    describe('Get engine state',() => {})
})
