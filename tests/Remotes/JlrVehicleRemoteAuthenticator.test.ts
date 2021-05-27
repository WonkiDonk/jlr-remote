import { JlrVehicleRemoteAuthenticator } from "../../src/Remotes/JlrVehicleRemoteAuthenticator"
import {createMock} from 'ts-auto-mock'
import { authenticationService, AuthenticationService } from "../../src/Authentication/AuthenticationService"
import { Auth } from "../../src/JaguarLandRover/ServiceTypes"

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
            const authResponse = { access_token: expectedAccessToken, authorization_token: expectedAuthorizationToken, expires_in: expectedExpiresIn, token_type: '', refresh_token: ''}
            const authenticationService = createMock<AuthenticationService>()
            authenticationService.authenticate = jest.fn(() => Promise.resolve(authResponse))

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
        test.each([
            ['access token', 'device Id', 'username'],
            ['fake token', 'no device Id', 'fake username'],
            ['bad token', 'bad device', 'no name']
        ])
        ('login to the JLR Vehicle Remote', async (expectedAccessToken, expectedDeviceId, expectedUsername) => {
            // Arrange
            const mockAuth = createMock<Auth>()
            mockAuth.access_token = expectedAccessToken

            const authenticationService = createMock<AuthenticationService>()
            authenticationService.authenticate = jest.fn(() => Promise.resolve(mockAuth))

            const authenticator = new JlrVehicleRemoteAuthenticator(expectedDeviceId, expectedUsername, '', authenticationService)
            
            // Act
            await authenticator.getAccessToken()
            
            // Assert
            expect(authenticationService.loginUser).toHaveBeenCalledWith(
                expectedAccessToken,
                expectedDeviceId,
                expectedUsername
            )
        })

        test.skip('returns a new access token', () => {})

        test.skip('returns the same access token if the existing access token has not expired', () => {})

        test.skip('returns a new access token using the refresh token after an access token has expired', () => {})
    })
})
