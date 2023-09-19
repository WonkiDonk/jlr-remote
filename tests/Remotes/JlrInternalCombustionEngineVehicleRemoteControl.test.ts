import { createMock } from 'ts-auto-mock'
import { CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { JlrInternalCombustionEngineVehicleRemoteControlBuilder } from './JlrInternalCombustionEngineVehicleRemote.builder'

describe('JLR Internal Combustion Engine Vehicle Remote Control', () => {
    describe('Turn on engine', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandIceVehicleService = mockCommandIceVehicleService 
                
                const remote = builder.build()

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
                
                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandIceVehicleService = mockCommandIceVehicleService
                
                const remote = builder.build()

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

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandIceVehicleService = mockCommandIceVehicleService

                const remote = builder.build()

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
                
                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandAuthenticationService = mockCommandAuthenticationService
                
                const remote = builder.build()

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

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

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

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

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
            ('uses user ID `%s`', async (expectedUserId) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.userId = expectedUserId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOnEngine()

                // Assert

                expect(mockCommandAuthenticationService.getReonToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserId,
                    expect.any(String))
            })
        
        test.each(['hello world', 'PIN Diesel', 'fake PIN'])
            ('uses user PIN `%s`', async (expectedUserPin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.userPin = expectedUserPin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

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

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.commandIceVehicleService = mockCommandIceVehicleService
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

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

    describe('Turn off engine', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                //Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandIceVehicleService = mockCommandIceVehicleService

                const remote = builder.build()

                //Act
                await remote.turnOffEngine()

                //Assert
                expect(mockCommandIceVehicleService.remoteEngineStop).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
                })
        test.each(['hello world', 'fake ID', 'bad ID'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                //Arrange
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandIceVehicleService = mockCommandIceVehicleService

                const remote = builder.build()

                //Act
                await remote.turnOffEngine()

                //Assert
                expect(mockCommandIceVehicleService.remoteEngineStop).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))

            })

        test.each (['vin1', 'vin2', 'vin3'])
            ('uses Vin `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandIceVehicleService = mockCommandIceVehicleService
                
                const remote = builder.build()

                // Act
                await remote.turnOffEngine()

                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStop).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })
    })

    describe('Gets REOFF token', () => {
        test.each (['real token', 'not a real token', 'garbage'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn (() => Promise.resolve(expectedAccessToken))

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandAuthenticationService = mockCommandAuthenticationService
                
                const remote = builder.build()

                // Act
                await remote.turnOffEngine()

                // Assert
                expect(mockCommandAuthenticationService.getReoffToken).toHaveBeenCalledWith(
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
                
                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOffEngine()

                // Assert

                expect(mockCommandAuthenticationService.getReoffToken).toHaveBeenCalledWith(
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

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOffEngine()
                
                // Assert

                expect(mockCommandAuthenticationService.getReoffToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String),
                    expect.any(String))
            })

            test.each (['hello world', 'useless ID', 'fake ID'])
            ('uses user ID `%s`', async (expectedUserId) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                
                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.userId = expectedUserId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOffEngine()
                
                // Assert

                expect(mockCommandAuthenticationService.getReoffToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserId,
                    expect.any(String))
            })
            
            test.each (['hello world', 'PIN Diesel', 'fake PIN'])
            ('uses user PIN `%s`', async (expectedUserPin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.userPin = expectedUserPin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOffEngine()
                
                // Assert
                expect(mockCommandAuthenticationService.getReoffToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserPin)
            })

            test.each(['real token', 'not a real token', 'garbage'])
            ('uses REON command token `%s`', async (expectedReoffCommandToken) => {
                // Arrange
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getReoffToken = jest.fn(() => Promise.resolve({token: expectedReoffCommandToken}))

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.commandIceVehicleService = mockCommandIceVehicleService
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.turnOffEngine()
                
                // Assert
                expect(mockCommandIceVehicleService.remoteEngineStop).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedReoffCommandToken)
            })
})

    describe('Get engine state',() => {})
})
