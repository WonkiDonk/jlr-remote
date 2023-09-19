import { VehicleRemoteAuthenticator } from './Types'
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    constructor(private readonly deviceId: string, private readonly username: string,
        private readonly password: string, private readonly authenticationService: AuthenticationService) { }

    getAccessToken = async (): Promise<string> => {
        return (await this.authenticate()).access_token
    }

    private async authenticate() {
        const authResponse = await this.authenticationService.authenticate(this.deviceId, this.username, this.password)
        await this.authenticationService.registerDevice(authResponse.access_token, this.deviceId, authResponse.authorization_token, authResponse.expires_in, this.username)
        await this.authenticationService.loginUser(authResponse.access_token, this.deviceId, this.username)

        return authResponse
    }
}
export { JlrVehicleRemoteAuthenticator }
