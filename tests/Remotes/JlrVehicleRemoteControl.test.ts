import { createMock } from 'ts-auto-mock'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { CommandVehicleService } from '../../src/Services/CommandVehicleService'
import { JlrVehicleRemoteControlBuilder } from './JlrVehicleRemoteControl.builder'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { CurrentVehicleStatus, VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CurrentVehicleStatusV3 } from '../../src/JaguarLandRover/ServiceTypes'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'

describe('JLR Vehicle Remote Control', () => {
    describe('Beep and flash', () => {
        test.each(['hello world', 'fake token', 'bad token'])
            ('uses access token `%s`', async (expectedAccessToken: string) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))
                
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockCommandVehicleService.honkHorn).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake ID', 'bad ID'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandVehicleService = mockCommandVehicleService
                
                const remote = builder.build()

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockCommandVehicleService.honkHorn).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'horse', 'cow'])
            ('uses the VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockCommandVehicleService.honkHorn).toBeCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets hblf command token', () => {
            test.each(['hello world', 'bad token', 'no token'])
                ('uses access token `%s`', async (expectedAccessToken: string) => {
                    // Arrange
                    const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()
                    
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockCommandAuthenticationService.getHblfToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake ID', 'bad ID'])
                ('uses device ID `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockCommandAuthenticationService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'Vin Diesel', 'fake VIN'])
                ('uses the VIN `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockCommandAuthenticationService.getHblfToken).toHaveBeenCalledWith(
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
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockCommandAuthenticationService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'VIN Diesel', 'fake VIN'])
                ('uses last four of VIN `%s`', async (expectedLastFourOfVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.lastFourOfVin = expectedLastFourOfVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()                    

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockCommandAuthenticationService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedLastFourOfVin)
                })
        })

        test.each(['hello world', 'what token', 'fake token'])
            ('uses the hblf command token `%s`', async (expectedHblfToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getHblfToken = jest.fn(() => Promise.resolve({token: expectedHblfToken}))

                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandVehicleService = mockCommandVehicleService

                const remote =  builder.build()

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockCommandVehicleService.honkHorn).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedHblfToken)
            })
    })

    describe('Lock vehicle', () => {
        test.each(['hello world', 'fake token', 'bad token'])
            ('uses access token `%s`', async (expectedAccessToken: string) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.lock()

                // Assert
                expect(mockCommandVehicleService.lockVehicle).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake Id', 'no Id'])
            ('uses the device Id `%s`', async (expectedDeviceId: string) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandVehicleService = mockCommandVehicleService
                
                const remote = builder.build()

                // Act
                await remote.lock()

                // Assert
                expect(mockCommandVehicleService.lockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'what VIN', 'who VIN'])
            ('uses the VIN `%s`', async (expectedVin: string) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandVehicleService = mockCommandVehicleService
                
                const remote = builder.build()

                // Act
                await remote.lock()

                // Assert
                expect(mockCommandVehicleService.lockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets the rdl token', () => {
            test.each(['hello world', 'bad token', 'what token'])
                ('uses the access token `%s`', async (expectedAccessToken: string) => {
                    // Arrange
                    const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()
                    
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRdlToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the device Id `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'no Vin', 'what Vin'])
                ('uses the VIN `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'new user', 'fake user'])
                ('uses the user Id `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'new Pin', 'old Pin'])
                ('uses the user PIN `%s`', async (expectedUserPin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.userPin = expectedUserPin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserPin)
                })
        })

        test.each(['hello world', 'good token', 'bad token'])
            ('uses the rdl token `%s`', async (expectedRdlToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getRdlToken = jest.fn(() => Promise.resolve({token: expectedRdlToken}))

                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.lock()

                // Assert
                expect(mockCommandVehicleService.lockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedRdlToken)
            })
    })

    describe('Unlock vehicle', () => {
        test.each(['hello world', 'bad token', 'good token'])
            ('uses the the access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))
                
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.unlock()

                // Assert
                expect(mockCommandVehicleService.unlockVehicle).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'no Id', 'fake Id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandVehicleService = mockCommandVehicleService
                
                const remote = builder.build()

                // Act
                await remote.unlock()

                // Assert
                expect(mockCommandVehicleService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake Vin', 'bad Vin'])
            ('uses the vin `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandVehicleService = mockCommandVehicleService
                
                const remote = builder.build()

                // Act
                await remote.unlock()

                // Assert
                expect(mockCommandVehicleService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets the rdu token', () => {
            test.each(['hello world', 'bad token', 'fake token'])
                ('uses the access token `%s`', async (expectedAccessToken) => {
                    // Arrange
                    const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                    mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()
                    
                    builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRduToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the device Id `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.deviceId = expectedDeviceId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'bad Vin', 'good Vin'])
                ('uses the Vin `%s`', async (expectedVin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.vin = expectedVin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the user Id `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.userId = expectedUserId
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'bad Pin', 'fake Pin'])
                ('uses the user Pin ``%s', async (expectedUserPin) => {
                    // Arrange
                    const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                    const builder = new JlrVehicleRemoteControlBuilder()

                    builder.userPin = expectedUserPin
                    builder.commandAuthenticationService = mockCommandAuthenticationService

                    const remote = builder.build()

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockCommandAuthenticationService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserPin)
                })
        })

        test.each(['hello world', 'bad Token', 'fake token'])
            ('uses the rdu token `%s`', async (expectedRduToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getRduToken = jest.fn(() => Promise.resolve({token: expectedRduToken}))

                const mockCommandVehicleService = createMock<CommandVehicleService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.commandAuthenticationService = mockCommandAuthenticationService
                builder.commandVehicleService = mockCommandVehicleService

                const remote = builder.build()

                // Act
                await remote.unlock()

                // Assert
                expect(mockCommandVehicleService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedRduToken)
            })
    })

    describe('Get lock state', () => {
        test.each(['some token', 'another token', 'not a real token'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthentication.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getLockState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String))
            })
        
        test.each(['device id', 'another device id', 'not a real device id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.deviceId = expectedDeviceId
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getLockState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String))
            })

        test.each(['VIN', 'another VIN', 'not a real VIN'])
            ('uses the VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                const builder = new JlrVehicleRemoteControlBuilder()

                builder.vin = expectedVin
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.queryVehicleInformationService = mockQueryVehicleInformationService

                const remote = builder.build()

                // Act
                await remote.getLockState()

                // Assert
                expect(mockQueryVehicleInformationService.getVehicleStatusV3).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin)
            })

        test.each([
            ['LOCKED', true],
            ['UNLOCKED', false]])
            ('returns expected lock state', async (lockedState, expectedIsLocked) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()

                const jlrStatus = createMock<CurrentVehicleStatusV3>()
                const status = createMock<CurrentVehicleStatus>()
                const mockVehicleStatusMapper = createMock<VehicleStatusMapper>()

                status.vehicleStatus.core.DOOR_IS_ALL_DOORS_LOCKED = lockedState === 'LOCKED' ? 'LOCKED' : 'UNLOCKED'

                mockVehicleStatusMapper.map = jest.fn((received) =>
                    received === jlrStatus
                        ? status
                        : createMock<CurrentVehicleStatus>())

                const mockQueryVehicleInformationService = createMock<QueryVehicleInformationService>()
                mockQueryVehicleInformationService.getVehicleStatusV3 = jest.fn(() => Promise.resolve(jlrStatus))

                const builder = new JlrVehicleRemoteControlBuilder()

                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthentication
                builder.queryVehicleInformationService = mockQueryVehicleInformationService
                builder.vehicleStatusMapper = mockVehicleStatusMapper

                const remote = builder.build()

                // Act
                const lockState = await remote.getLockState()

                // Assert
                expect(lockState.isLocked).toBe(expectedIsLocked)
            })
    })
})


