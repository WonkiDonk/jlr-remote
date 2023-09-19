import { VehicleRemoteAuthenticator, VehicleRemoteAuthenticationCache } from './Types'
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    constructor(private readonly deviceId: string, private readonly username: string,
        private readonly password: string, private readonly authenticationService: AuthenticationService,
        private readonly authenticationCache: VehicleRemoteAuthenticationCache) { }

    getAccessToken = async (): Promise<string> => {
        const cachedAuthentication = this.authenticationCache.getCachedAuthentication();

        if (!cachedAuthentication.isExpired)
            return cachedAuthentication.accessToken

        const authentication = await this.authenticate()
        this.authenticationCache.cacheAuthentication(authentication.access_token, parseInt(authentication.expires_in))

        return authentication.access_token
    }

    private async authenticate() {
        const authResponse = await this.authenticationService.authenticate(this.deviceId, this.username, this.password)
        await this.authenticationService.registerDevice(authResponse.access_token, this.deviceId, authResponse.authorization_token, authResponse.expires_in, this.username)
        await this.authenticationService.loginUser(authResponse.access_token, this.deviceId, this.username)

        return authResponse
    }
}
export { JlrVehicleRemoteAuthenticator }
