import { JlrVehicleRemoteControl } from "../../src/Remotes/JlrVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { CommandVehicleService } from '../../src/Services/CommandVehicleService'
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types"
import { CommandAuthenticationService } from "../../src/Authentication/CommandAuthenticationService"

describe('JLR Vehicle Remote Control', () => {
    describe('Beep and flash', () => {
        test.each(['hello world', 'fake token', 'bad token'])
            ('uses access token `%s`', async (expectedAccessToken: string) => {
                // Arrange
                const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                const mockGetAccessToken = jest.fn()
                mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthentication, createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockService.honkHorn).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake ID', 'bad ID'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockService.honkHorn).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'horse', 'cow'])
            ('uses the VIN `%s`', async (expectedVin) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockService.honkHorn).toBeCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String)
                )
            })

        describe('Gets hblf command token', () => {
            test.each(['hello world', 'bad token', 'no token'])
                ('uses access token `%s`', async (expectedAccessToken: string) => {
                    // Arrange
                    const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                    const mockVehicleService = createMock<CommandVehicleService>()
                    const mockGetAccessToken = jest.fn()
                    mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                    mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthentication, mockService, mockVehicleService)

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockService.getHblfToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake ID', 'bad ID'])
                ('uses device ID `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'Vin Diesel', 'fake VIN'])
                ('uses the VIN `%s`', async (expectedVin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'useless ID', 'fake ID'])
                ('uses user ID `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', expectedUserId, '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockService.getHblfToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'VIN Diesel', 'fake VIN'])
                ('uses last four of VIN `%s`', async (expectedLastFourOfVin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', expectedLastFourOfVin, '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.beepAndFlash()

                    // Assert
                    expect(mockService.getHblfToken).toHaveBeenCalledWith(
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
                const mockGetHblfToken = jest.fn()
                const commandToken = { token: expectedHblfToken }
                mockGetHblfToken.mockImplementation(() => Promise.resolve(commandToken))

                mockCommandAuthenticationService.getHblfToken = mockGetHblfToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockCommandAuthenticationService, mockService)

                // Act
                await remote.beepAndFlash()

                // Assert
                expect(mockService.honkHorn).toHaveBeenCalledWith(
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
                const mockGetAccessToken = jest.fn()
                mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthentication, createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.lock()

                // Assert
                expect(mockService.lockVehicle).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake Id', 'no Id'])
            ('uses the device Id `%s`', async (expectedDeviceId: string) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.lock()

                // Assert
                expect(mockService.lockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'what VIN', 'who VIN'])
            ('uses the VIN `%s`', async (expectedVin: string) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.lock()

                // Assert
                expect(mockService.lockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Get the rdl token', () => {
            test.each(['hello world', 'bad token', 'what token'])
                ('uses the access token `%s`', async (expectedAccessToken: string) => {
                    // Arrange
                    const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
                    const mockGetAccessToken = jest.fn()
                    mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                    mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthentication, mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockService.getRdlToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the device Id `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'no Vin', 'what Vin'])
                ('uses the VIN `%s`', async (expectedVin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'new user', 'fake user'])
                ('uses the user Id `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', expectedUserId, '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.lock()

                    // Assert
                    expect(mockService.getRdlToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'new Pin', 'old Pin'])
                ('uses the user PIN `%s`', async (expectedUserPin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', '', expectedUserPin, createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act 
                    await remote.lock()

                    // Assert
                    expect(mockService.getRdlToken).toHaveBeenCalledWith(
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
                const mockGetHblfToken = jest.fn()
                const commandToken = { token: expectedRdlToken }
                mockGetHblfToken.mockImplementation(() => Promise.resolve(commandToken))

                mockCommandAuthenticationService.getRdlToken = mockGetHblfToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockCommandAuthenticationService, mockService)

                // Act
                await remote.lock()

                // Assert
                expect(mockService.lockVehicle).toHaveBeenCalledWith(
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
                const mockGetAccessToken = jest.fn()
                mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthentication, createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.unlock()

                // Assert
                expect(mockService.unlockVehicle).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'no Id', 'fake Id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.unlock()

                // Assert
                expect(mockService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String))
            })

        test.each(['hello world', 'fake Vin', 'bad Vin'])
            ('uses the vin `%s`', async (expectedVin) => {
                // Arrange
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

                // Act
                await remote.unlock()

                // Assert
                expect(mockService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String))
            })

        describe('Gets the rdu token', () => {
            test.each(['hello world', 'bad token', 'fake token'])
                ('uses the access token `%s`', async (expectedAccessToken) => {
                    // Arrange
                    const mockVehicleRemoteAuthenticaton = createMock<VehicleRemoteAuthenticator>()
                    const mockGetAccessToken = jest.fn()
                    mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

                    mockVehicleRemoteAuthenticaton.getAccessToken = mockGetAccessToken

                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', '', '', mockVehicleRemoteAuthenticaton, mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockService.getRduToken).toHaveBeenCalledWith(
                        expectedAccessToken,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the device Id `%s`', async (expectedDeviceId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act 
                    await remote.unlock()

                    // Assert
                    expect(mockService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expectedDeviceId,
                        expect.any(String),
                        expect.any(String),
                        expect.any(String))

                })

            test.each(['hello world', 'bad Vin', 'good Vin'])
                ('uses the Vin `%s`', async (expectedVin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expectedVin,
                        expect.any(String),
                        expect.any(String))
                })

            test.each(['hello world', 'fake Id', 'no Id'])
                ('uses the user Id `%s`', async (expectedUserId) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', expectedUserId, '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockService.getRduToken).toHaveBeenCalledWith(
                        expect.any(String),
                        expect.any(String),
                        expect.any(String),
                        expectedUserId,
                        expect.any(String))
                })

            test.each(['hello world', 'bad Pin', 'fake Pin'])
                ('uses the user Pin ``%s', async (expectedUserPin) => {
                    // Arrange
                    const mockService = createMock<CommandAuthenticationService>()
                    const remote = new JlrVehicleRemoteControl('', '', '', '', expectedUserPin, createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

                    // Act
                    await remote.unlock()

                    // Assert
                    expect(mockService.getRduToken).toHaveBeenCalledWith(
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
                const mockGetRduToken = jest.fn()
                const commandToken = { token: expectedRduToken }
                mockGetRduToken.mockImplementation(() => Promise.resolve(commandToken))

                mockCommandAuthenticationService.getRduToken = mockGetRduToken

                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockCommandAuthenticationService, mockService)

                // Act
                await remote.unlock()

                // Assert
                expect(mockService.unlockVehicle).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedRduToken)
            })
    })

    describe('Get lock state', () => {

    })
})


