import { createMock } from 'ts-auto-mock'
import { CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'
import { VehicleRemoteAuthenticator, CurrentVehicleStatus } from '../../src/Remotes/Types'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { JlrInternalCombustionEngineVehicleRemoteControlBuilder } from './JlrInternalCombustionEngineVehicleRemote.builder'
import { CurrentVehicleStatusV3 } from '../../src/JaguarLandRover/ServiceTypes'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'

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

        test.each(['vin1', 'vin2', 'vin3'])
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
                    mockCommandAuthenticationService.getReonToken = jest.fn(() => Promise.resolve({ token: expectedReonCommandToken }))

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

        test.each(['vin1', 'vin2', 'vin3'])
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

        describe('Gets REOFF token', () => {
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

            test.each(['hello world', 'useless ID', 'fake ID'])
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

            test.each(['hello world', 'PIN Diesel', 'fake PIN'])
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
                    mockCommandAuthenticationService.getReoffToken = jest.fn(() => Promise.resolve({ token: expectedReoffCommandToken }))

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
    })

    describe('Get engine state', () => {
        test.skip('returns expected engine state', () => { })
    })

    describe('Turn on climate control', () => {
        test('turns on the engine', async () => {
            // Arrange.
            const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

            const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
            builder.commandIceVehicleService = mockCommandIceVehicleService

            const remote = builder.build()

            // Act.
            await remote.turnOnClimateControl(0)

            // Assert.
            expect(mockCommandIceVehicleService.remoteEngineStart).toHaveBeenCalledTimes(1)
        })

        test.each([
            ['access token', 'device id', 'vin', 'user id', 'user PIN', 'prov token'],
            ['another token', 'a new device id', 'vin diesel', 'user identity', 'user brooche', 'different prov token'],
            ['not even a token', 'identifier', 'vehicle identification number', 'user identifier', 'user safety pin', 'provisioning token']])
            ('puts the vehicle into provisioning mode %s %s %s %s %s %s', async (expectedAccessToken, expectedDeviceId, expectedVin, expectedUserId, expectedUserPin, expectedProvToken) => {
                // Arrange.
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const mockAuthenticationService = createMock<VehicleRemoteAuthenticator>()
                mockAuthenticationService.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getProvToken = jest.fn((accessToken, deviceId, vin, userId, userPin) => {
                    const token = (accessToken === expectedAccessToken && deviceId === expectedDeviceId && vin === expectedVin && userId === expectedUserId && userPin === expectedUserPin)
                        ? expectedProvToken
                        : 'invalid token'
                    return Promise.resolve({ token })
                })

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockAuthenticationService
                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandIceVehicleService = mockCommandIceVehicleService
                builder.deviceId = expectedDeviceId
                builder.vin = expectedVin
                builder.userId = expectedUserId
                builder.userPin = expectedUserPin

                const remote = builder.build()

                // Act.
                await remote.turnOnClimateControl(1)

                // Assert.
                expect(mockCommandIceVehicleService.enableProvisioningMode).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expectedDeviceId,
                    expectedVin,
                    expectedProvToken)
            })

        test.each([
            ['expected access token', 'expected device id', 'expected vin', 32],
            ['access token', 'device id', 'vin', 78],
            ['lorem', 'ipsum', 'dolar sit', 98.5]
        ])
            ('sets that target temperature %s %s %s %s', async (expectedAccessToken, expectedDeviceId, expectedVin, expectedTargetTemperature) => {
                // Arrange.
                const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

                const mockAuthenticationService = createMock<VehicleRemoteAuthenticator>()
                mockAuthenticationService.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockAuthenticationService
                builder.commandIceVehicleService = mockCommandIceVehicleService
                builder.deviceId = expectedDeviceId
                builder.vin = expectedVin

                const remote = builder.build()

                // Act.
                await remote.turnOnClimateControl(expectedTargetTemperature)

                // Assert.
                expect(mockCommandIceVehicleService.setRemoteClimateControlTargetTemperature).toBeCalledWith(
                    expectedAccessToken,
                    expectedDeviceId,
                    expectedVin,
                    expectedTargetTemperature)
            })
    })

    describe('Turn off climate control', () => {
        test('turns off the engine', async () => {
            // Arrange.
            const mockCommandIceVehicleService = createMock<CommandIceVehicleService>()

            const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
            builder.commandIceVehicleService = mockCommandIceVehicleService

            const remote = builder.build()

            // Act.
            await remote.turnOffClimateControl()

            // Assert.
            expect(mockCommandIceVehicleService.remoteEngineStop).toHaveBeenCalledTimes(1)
        })
    })

    describe('Is climate control on', () => {
        test.each([
            ['access token', 'device Id', 'VIN'],
            ['fake access token', 'fake device Id', 'fake VIN'],
            ['proper, innit', 'proper device Id', 'Vin Diesel']])
            ('uses expected credentials to get vehicle information %s %s %s %s', async (expectedAccessToken, expectedDeviceId, expectedVin) => {
                // Arrange.
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.queryVehicleInformationService = mockQueryVehicleInformationService
                builder.deviceId = expectedDeviceId
                builder.vin = expectedVin

                const remote = builder.build()

                // Act.
                await remote.isClimateControlOn()

                // Assert.
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expectedDeviceId,
                    expectedVin)
            })

        test.each([
            ['HEATING', true],
            ['OFF', false]
        ])('returns expected climate status', async (climate_status_operating_status, expectedIsClimateControlOn) => {
            // Arrange
            const serviceStatus = createMock<CurrentVehicleStatusV3>()
            const mappedStatus = createMock<CurrentVehicleStatus>()
            const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

            mappedStatus.vehicleStatus.core.CLIMATE_STATUS_OPERATING_STATUS = climate_status_operating_status
            mockVehicleStatusMapper.map = jest.fn(() => mappedStatus)

            const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
            mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(serviceStatus))

            const builder = new JlrInternalCombustionEngineVehicleRemoteControlBuilder()
            builder.queryVehicleInformationService = mockQueryVehicleInformationService
            builder.vehicleStatusMapper = mockVehicleStatusMapper

            const remote = builder.build()

            // Act
            const isClimateControlOn = await remote.isClimateControlOn()

            // Assert
            expect(isClimateControlOn).toBe(expectedIsClimateControlOn)
        })
    })
})
