import {createMock} from 'ts-auto-mock'
import { JlrVehicleRemoteAuthenticator } from "../../src/Remotes/JlrVehicleRemoteAuthenticator"
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"
import { Auth } from "../../src/JaguarLandRover/ServiceTypes"
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types"
import { JlrVehicleRemoteAuthenticatorBuilder } from "./JlrVehicleRemoteAuthenticator.builder"

describe('Vehicle Remote Authenticator', () => {
    describe('Get Access Token', () => {
        test.each([
            ['expectedDeviceId', 'expectedUserName', 'expectedPassword'],
            ['another Device', 'another user name', 'secret password'],
            ['not a real device', 'a fake email', 'a fake password']])
            ('authenticates with JLR Vehicle Remote', async (expectedDeviceId, expectedUsername, expectedPassword) => {
                // Arrange
                const authenticationService = createMock<AuthenticationService>()
                const builder = new JlrVehicleRemoteAuthenticatorBuilder()
                builder.authenticationService = authenticationService
                builder.deviceId = expectedDeviceId
                builder.username = expectedUsername
                builder.password = expectedPassword

                const authenticator = builder.build()
            
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
                const authResponse = { access_token: expectedAccessToken, authorization_token: expectedAuthorizationToken, expires_in: expectedExpiresIn, token_type: '', refresh_token: '' }
                const authenticationService = createMock<AuthenticationService>()
                authenticationService.authenticate = jest.fn(() => Promise.resolve(authResponse))

                const builder = new JlrVehicleRemoteAuthenticatorBuilder()
                builder.authenticationService = authenticationService
                builder.deviceId = expectedDeviceId
                builder.username = expectedUsername

                const authenticator = builder.build()
            
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

                const builder = new JlrVehicleRemoteAuthenticatorBuilder()
                builder.authenticationService = authenticationService
                builder.deviceId = expectedDeviceId
                builder.username = expectedUsername

                const authenticator = builder.build()
            
                // Act
                await authenticator.getAccessToken()
            
                // Assert
                expect(authenticationService.loginUser).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expectedDeviceId,
                    expectedUsername
                )
            })

        test.each(['good token', 'bad token', 'fake token'])
            ('returns a new access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockAuth = createMock<Auth>()
                mockAuth.access_token = expectedAccessToken

                const authenticationService = createMock<AuthenticationService>()
                authenticationService.authenticate = jest.fn(() => Promise.resolve(mockAuth))

                const builder = new JlrVehicleRemoteAuthenticatorBuilder()
                builder.authenticationService = authenticationService

                const authenticator = builder.build()

                // Act
                const response = await authenticator.getAccessToken()
            
                // Assert
                expect(response).toBe(expectedAccessToken)
            })

        test.skip
            ('returns the same access token if the existing access token has not expired', () => {
                // Todo
            })

        test.skip
            ('does not re-authenticate if the existing access token has not expired', () => {
                // To do
            })

        test.skip
            ('returns a new access token using the refresh token after an access token has expired', () => {
                // To do
            })
    })
})
