import { VehicleRemoteAuthenticator } from './Types'
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    constructor(private readonly authenticationService: AuthenticationService) { }
    getAccessToken = async (deviceId: string, username: string, password: string): Promise<string> => {
        const authResponse = await this.authenticationService.authenticate(deviceId, username, password)
        await this.authenticationService.registerDevice(authResponse.access_token, deviceId,
             authResponse.authorization_token, authResponse.expires_in, username)

        await this.authenticationService.loginUser(authResponse.access_token, deviceId, username)
        
        return ''
    }
}

export { JlrVehicleRemoteAuthenticator }
