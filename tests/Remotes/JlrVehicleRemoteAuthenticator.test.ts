import { JlrVehicleRemoteAuthenticator } from "../../src/Remotes/JlrVehicleRemoteAuthenticator"
import {createMock} from 'ts-auto-mock'
import { authenticationService, AuthenticationService } from "../../src/Authentication/AuthenticationService"

describe('Vehicle Remote Authenticator', () => {
    describe('Get Access Token', () => {
        test.each([
            ['expectedDeviceId', 'expectedUserName', 'expectedPassword'],
            ['another Device', 'another user name', 'secret password'],
            ['not a real device', 'a fake email', 'a fake password']])
        ('authenticates with JLR Vehicle Remote', async (expectedDeviceId, expectedUsername, expectedPassword) => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator(expectedDeviceId, expectedUsername, expectedPassword, authenticationService)
            
            // Act
            await authenticator.getAccessToken()
            
            // Assert
            expect(authenticationService.authenticate).toHaveBeenCalledWith(
                expectedDeviceId,
                expectedUsername,
                expectedPassword
            )
        })
        test.each([
            ['access token', 'device id', 'auth token', 'expires in', 'user name'],
            ['another token', 'special device id', 'not an auth token', 'never expires in', 'me!'],
            ['final token', 'lol device id', 'simple auth token', 'expires tomorrow', 'your user name']
        ])
        ('registers the device with JLR Vehicle Remote', async (expectedAccessToken, expectedDeviceId, expectedAuthorizationToken, expectedExpiresIn, expectedUsername) => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authResponse = { access_token: expectedAccessToken, authorization_token: expectedAuthorizationToken, expires_in: expectedExpiresIn, token_type: '', refresh_token: ''}
            const mockAuthenticate = jest.fn()
            mockAuthenticate.mockImplementation(() => Promise.resolve(authResponse))

            authenticationService.authenticate = mockAuthenticate

            const authenticator = new JlrVehicleRemoteAuthenticator(expectedDeviceId, expectedUsername, 'do not care', authenticationService)
            
            // Act
            await authenticator.getAccessToken()
            
            // Assert
            expect(authenticationService.registerDevice).toHaveBeenCalledWith(
                expectedAccessToken,
                expectedDeviceId,
                expectedAuthorizationToken,
                expectedExpiresIn,
                expectedUsername
            )
        })
        test('login to the JLR Vehicle Remote', async () => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator('', '', '', authenticationService)
            
            // Act
            await authenticator.getAccessToken()
            
            // Assert
            expect(authenticationService.loginUser).toHaveBeenCalledTimes(1)
        })
    })
})
