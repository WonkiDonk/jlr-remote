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
        test('registers the device with JLR Vehicle Remote', async () => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator('', '', '', authenticationService)
            
            // Act
            await authenticator.getAccessToken()
            
            // Assert
            expect(authenticationService.registerDevice).toHaveBeenCalledTimes(1)
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
