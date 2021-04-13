import { JlrVehicleRemoteControl } from "../../src/Remotes/JlrVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { CommandVehicleService } from '../../src/Services/CommandVehicleService'
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types"
import { JlrVehicleRemoteInformation } from "../../src/Remotes/JlrVehicleRemoteInformation"
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
                const remote = new JlrVehicleRemoteControl('', '', '', '', mockVehicleRemoteAuthentication, createMock<CommandAuthenticationService>(), mockService)

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
                const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

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
                const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', createMock<VehicleRemoteAuthenticator>(), createMock<CommandAuthenticationService>(), mockService)

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
                    const remote = new JlrVehicleRemoteControl('', '', '', '', mockVehicleRemoteAuthentication, mockService, mockVehicleService)

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
                    const remote = new JlrVehicleRemoteControl(expectedDeviceId, '', '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

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
                    const remote = new JlrVehicleRemoteControl('', expectedVin, '', '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

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
                    const remote = new JlrVehicleRemoteControl('', '', expectedUserId, '', createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

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
                    const remote = new JlrVehicleRemoteControl('', '', '', expectedLastFourOfVin, createMock<VehicleRemoteAuthenticator>(), mockService, createMock<CommandVehicleService>())

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

        test.each(['hello world', 'what token', 'this token'])
            ('uses the hblf command token `%s`', async (expectedHblfToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const mockService = createMock<CommandVehicleService>()
                const remote = new JlrVehicleRemoteControl('', '', '', '', createMock<VehicleRemoteAuthenticator>(), mockCommandAuthenticationService, mockService)

                const mockHblfToken = mockCommandAuthenticationService.getHblfToken('', '', '', '', '')
                expectedHblfToken = (await mockHblfToken).token

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

    })

    describe('Unlock vehicle', () => {

    })

    describe('Get lock state', () => {

    })
})