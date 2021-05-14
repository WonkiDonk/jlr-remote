import { JlrVehicleRemoteAuthenticator } from "../../src/Remotes/JlrVehicleRemoteAuthenticator"
import {createMock} from 'ts-auto-mock'
import { authenticationService, AuthenticationService } from "../../src/Authentication/AuthenticationService"

describe('Vehicle Remote Authenticator', () => {
    describe('Get Access Token', () => {
        test('authenticates with JLR Vehicle Remote', async () => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator(authenticationService)
            
            // Act
            await authenticator.getAccessToken('deviceId', 'username', 'password')
            
            // Assert
            expect(authenticationService.authenticate).toHaveBeenCalledTimes(1)
        })
        test('registers the device with JLR Vehicle Remote', async () => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator(authenticationService)
            
            // Act
            await authenticator.getAccessToken('deviceId', 'username', 'password')
            
            // Assert
            expect(authenticationService.registerDevice).toHaveBeenCalledTimes(1)
        })
        test('login to the JLR Vehicle Remote', async () => {
            // Arrange
            const authenticationService = createMock<AuthenticationService>()
            const authenticator = new JlrVehicleRemoteAuthenticator(authenticationService)
            
            // Act
            await authenticator.getAccessToken('deviceId', 'username', 'password')
            
            // Assert
            expect(authenticationService.loginUser).toHaveBeenCalledTimes(1)
        })
    })
})
