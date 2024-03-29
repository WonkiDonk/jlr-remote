import { createMock } from 'ts-auto-mock'
import { CommandElectricVehicleService } from '../../src/Services/CommandElectricVehicleService'
import { CurrentVehicleStatus, VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { JlrElectricVehicleRemoteControlBuilder } from './JlrElectricVehicleRemoteControl.builder'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { CurrentVehicleStatusV3 } from '../../src/JaguarLandRover/ServiceTypes'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'


describe('JLR Electric Vehicle Remote Control', () => {
    describe('Start charging', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))

            })

        test.each(['hello world', 'fake ID', 'bad ID'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['vin1', 'vin2', 'vin3'])
            ('uses vin `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets cpToken', () => {
            test.each(['real token', 'not a real token', 'garbage'])
                ('uses access token `%s`', async (expectedAccessToken) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
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

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()


                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'Vin Diesel', 'fake VIN'])
                ('uses vin `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
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

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['VIN1234', 'VIN4321', 'VIN1243', 'VIN4312'])
                ('uses last four of vin `%s`', async (expectedLastFourOfVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.lastFourOfVin = expectedLastFourOfVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedLastFourOfVin)
                })

            test.each(['cp Token1', 'cp Token2', 'cp Token3'])
                ('uses cpToken `%s`', async (expectedCpToken) => {
                    // Arrange
                    const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    mockCommandAuthenticationService.getCpToken = jest.fn(() => Promise.resolve({ token: expectedCpToken }))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.commandElectricVehicleService = mockCommandElectricVehicleService
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.startCharging()

                    // Assert
                    expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedCpToken)
                })
        })
    })

    describe('Stop charging', () => {
        test.each(['some token', 'fake token', 'hello world'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.stopCharging()

                //Assert
                expect(mockCommandElectricVehicleService.stopCharging).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['some device id', 'not a real device id', 'dani and will pairing innit'])
            ('uses deviceId `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.stopCharging()

                // Assert
                expect(mockCommandElectricVehicleService.stopCharging).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'Vin Diesel', 'fake VIN'])
            ('uses vin `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.stopCharging()

                // Assert
                expect(mockCommandElectricVehicleService.stopCharging).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets cpToken', () => {
            test.each(['real token', 'not a real token', 'garbage'])
                ('uses access token `%s`', async (expectedAccessToken) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'useless ID', 'fake ID'])
                ('uses device ID `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'Vin Diesel', 'fake VIN'])
                ('uses vin `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
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

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['VIN1234', 'VIN4321', 'VIN1243', 'VIN4312'])
                ('uses last four of vin `%s`', async (expectedLastFourOfVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.lastFourOfVin = expectedLastFourOfVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedLastFourOfVin)
                })

            test.each(['cp Token1', 'cp Token2', 'cp Token3'])
                ('uses cpToken `%s`', async (expectedCpToken) => {
                    // Arrange
                    const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    mockCommandAuthenticationService.getCpToken = jest.fn(() => Promise.resolve({ token: expectedCpToken }))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.commandElectricVehicleService = mockCommandElectricVehicleService
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.stopCharging()

                    // Assert
                    expect(mockCommandElectricVehicleService.stopCharging).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedCpToken)
                })
        })
    })

    describe('Get charge state', () => {
        test.each(['some token', 'another token', 'not a real token'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getChargeState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['device id', 'another device id', 'not a real device id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getChargeState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String))
            })

        test.each(['VIN', 'another VIN', 'not a real VIN'])
            ('uses the VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getChargeState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin)
            })

        test.each([
            ['CHARGING', true],
            ['NOT_CHARGING', false],
            ['UNKNOWN', undefined]])
            ('returns expected charging state `%s` `%s`', async (ev_charging_status, expectedIsCharging) => {
                // Arrange
                const serviceStatus = createMock<CurrentVehicleStatusV3>()
                const mappedStatus = createMock<CurrentVehicleStatus>()
                const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

                mappedStatus.vehicleStatus.ev.EV_CHARGING_STATUS = ev_charging_status
                mockVehicleStatusMapper.map = jest.fn(() => mappedStatus)

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(serviceStatus))

                const builder = new JlrElectricVehicleRemoteControlBuilder()

                builder.queryVehicleInformationService = mockQueryVehicleInformationService
                builder.vehicleStatusMapper = mockVehicleStatusMapper

                const remote = builder.build()

                // Act
                const chargeState = await remote.getChargeState()

                // Assert
                expect(chargeState.isCharging).toBe(expectedIsCharging)
            })

        test.each([
            ['CONNECTED', true],
            ['NOT_CONNECTED', false],
            ['UNKNOWN', undefined]])
            ('returns expected cable state `%s` `%s`', async (ev_is_plugged_in, expectedIsConnected) => {
                // Arrange
                const serviceStatus = createMock<CurrentVehicleStatusV3>()
                const mappedStatus = createMock<CurrentVehicleStatus>()
                const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

                mappedStatus.vehicleStatus.ev.EV_IS_PLUGGED_IN = ev_is_plugged_in
                mockVehicleStatusMapper.map = jest.fn(() => mappedStatus)

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(serviceStatus))

                const builder = new JlrElectricVehicleRemoteControlBuilder()

                builder.queryVehicleInformationService = mockQueryVehicleInformationService
                builder.vehicleStatusMapper = mockVehicleStatusMapper

                const remote = builder.build()

                // Act
                const chargeState = await remote.getChargeState()

                // Assert
                expect(chargeState.isConnected).toBe(expectedIsConnected)
            })

        test.each([
            ['100', 100],
            ['50', 50],
            ['95', 95],
            ['17', 17],
            ['NaN', undefined],
            ['something else', undefined]])
            ('returns expected cable state `%s` `%s`', async (ev_state_of_charge, expectedChargeLevel) => {
                // Arrange
                const serviceStatus = createMock<CurrentVehicleStatusV3>()
                const mappedStatus = createMock<CurrentVehicleStatus>()
                const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

                mappedStatus.vehicleStatus.ev.EV_STATE_OF_CHARGE = ev_state_of_charge
                mockVehicleStatusMapper.map = jest.fn(() => mappedStatus)

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(serviceStatus))

                const builder = new JlrElectricVehicleRemoteControlBuilder()

                builder.queryVehicleInformationService = mockQueryVehicleInformationService
                builder.vehicleStatusMapper = mockVehicleStatusMapper

                const remote = builder.build()

                // Act
                const chargeState = await remote.getChargeState()

                // Assert
                expect(chargeState.chargeLevel).toBe(expectedChargeLevel)
            })
    })

    describe('Turn on climate control', () => {
        test.each([
            ['some token', 1],
            ['another token', 2],
            ['not a real token', 3]])
            ('uses access token `%s`', async (expectedAccessToken, targetTemperature) => {
                // Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.turnOnClimateControl(targetTemperature)

                // Assert
                expect(mockCommandElectricVehicleService.startClimatePreconditioning).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(Number))
            })

        test.each([
            ['some device ID', 1],
            ['another device ID', 2],
            ['not a real device ID', 3]])
            ('uses deviceId `%s`', async (expectedDeviceId, targetTemperature) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService
                builder.deviceId = expectedDeviceId

                const remote = builder.build()

                // Act
                await remote.turnOnClimateControl(targetTemperature)

                // Assert
                expect(mockCommandElectricVehicleService.startClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String),
                    expect.any(Number))
            })

        test.each([
            ['some VIN', 1],
            ['another VIN', 2],
            ['not a real VIN', 3]])
            ('uses VIN `%s`', async (expectedVin, targetTemperature) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService
                builder.vin = expectedVin

                const remote = builder.build()

                // Act
                await remote.turnOnClimateControl(targetTemperature)

                // Assert
                expect(mockCommandElectricVehicleService.startClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String),
                    expect.any(Number))
            })

        describe('Get ECC token', () => {
            test.each([
                ['real token', 1],
                ['fake token', 2],
                ['unimportant token', 3]
            ])
                ('uses access token `%s`', async (expectedAccessToken, targetTemperature) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOnClimateControl(targetTemperature)

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each([
                ['device id', 1],
                ['fake device id', 2],
                ['another device id', 3]
            ])
                ('uses device Id `%s`', async (expectedDeviceId, targetTemperature) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOnClimateControl(targetTemperature)

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each([
                ['VIN', 1],
                ['fake VIN', 2],
                ['another VIN', 3]
            ])
                ('uses VIN `%s`', async (expectedVin, targetTemperature) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOnClimateControl(targetTemperature)

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each([
                ['user ID', 1],
                ['fake user ID', 2],
                ['another user ID', 3]
            ])
                ('uses user ID `%s`', async (expectedUserId, targetTemperature) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOnClimateControl(targetTemperature)

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each([
                ['last four of VIN', 1],
                ['a new last four of VIN', 2],
                ['not even a last four of VIN', 3]
            ])
                ('uses last four of VIN `%s`', async (expectedLastFourOfVin, targetTemperature) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.lastFourOfVin = expectedLastFourOfVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOnClimateControl(targetTemperature)

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedLastFourOfVin)
                })
        })

        test.each([
            ['real ECC token', 1],
            ['fake ECC token', 2],
            ['unimportant ECC token', 3]
        ])
            ('uses ECC token `%s`', async (expectedEccToken, targetTemperature) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getEccToken = jest.fn(() => Promise.resolve({ token: expectedEccToken }))

                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.turnOnClimateControl(targetTemperature)

                // Assert
                expect(mockCommandElectricVehicleService.startClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedEccToken,
                    expect.any(Number))
            })

        test.each([[1, 10], [2, 20], [1.5, 15]])
            ('uses target temperature `%s` x 10', async (targetTemperature, expectedTargetTemperature) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.turnOnClimateControl(targetTemperature)

                // Assert
                expect(mockCommandElectricVehicleService.startClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedTargetTemperature)
            })
    })

    describe('Turn off climate control', () => {
        test.each(['lorem', 'ipsum', 'dolar sit'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.turnOffClimateControl()

                // Assert
                expect(mockCommandElectricVehicleService.stopClimatePreconditioning).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['lorem', 'ipsum', 'dolar sit'])
            ('uses deviceId `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService
                builder.deviceId = expectedDeviceId

                const remote = builder.build()

                // Act
                await remote.turnOffClimateControl()

                // Assert
                expect(mockCommandElectricVehicleService.stopClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['lorem', 'ipsum', 'dolar sit'])
            ('uses VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService
                builder.vin = expectedVin

                const remote = builder.build()

                // Act
                await remote.turnOffClimateControl()

                // Assert
                expect(mockCommandElectricVehicleService.stopClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Get ECC token', () => {
            test.each(['lorem', 'ipsum', 'dolar sit'])
                ('uses access token `%s`', async (expectedAccessToken) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOffClimateControl()

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['lorem', 'ipsum', 'dolar sit'])
                ('uses device Id `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOffClimateControl()

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['lorem', 'ipsum', 'dolar sit'])
                ('uses VIN `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOffClimateControl()

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['lorem', 'ipsum', 'dolar sit'])
                ('uses user ID `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOffClimateControl()

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['lorem', 'ipsum', 'dolar sit'])
                ('uses last four of VIN `%s`', async (expectedLastFourOfVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                    const builder = new JlrElectricVehicleRemoteControlBuilder()
                    builder.lastFourOfVin = expectedLastFourOfVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.turnOffClimateControl()

                    // Assert
                    expect(mockCommandAuthenticationService.getEccToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedLastFourOfVin)
                })
        })

        test.each(['lorem', 'ipsum', 'dolar sit'])
            ('uses ECC token `%s`', async (expectedEccToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getEccToken = jest.fn(() => Promise.resolve({ token: expectedEccToken }))

                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandElectricVehicleService = mockCommandElectricVehicleService

                const remote = builder.build()

                // Act
                await remote.turnOffClimateControl()

                // Assert
                expect(mockCommandElectricVehicleService.stopClimatePreconditioning).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedEccToken)
            })
    })

    describe('Is climate control on?', () => {
        test.each(['some token', 'another token', 'not a real token'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.isClimateControlOn()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['device id', 'another device id', 'not a real device id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.isClimateControlOn()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String))
            })

        test.each(['VIN', 'another VIN', 'not a real VIN'])
            ('uses the VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.isClimateControlOn()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin)
            })

        test.each([
            ['HEATING', true],
            ['OFF', false]])
            ('returns expected climate control state `%s` `%s`', async (climate_status_operating_status, expectedIsClimateControlOn) => {
                // Arrange
                const serviceStatus = createMock<CurrentVehicleStatusV3>()
                const mappedStatus = createMock<CurrentVehicleStatus>()
                const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

                mappedStatus.vehicleStatus.core.CLIMATE_STATUS_OPERATING_STATUS = climate_status_operating_status
                mockVehicleStatusMapper.map = jest.fn(() => mappedStatus)

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(serviceStatus))

                const builder = new JlrElectricVehicleRemoteControlBuilder()

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