import { AuthenticationResult, VehicleRemoteAuthenticator, VehicleRemoteAuthenticationCache } from './Types'
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"
import { Auth, LoginUserResponse } from '../../src/JaguarLandRover/ServiceTypes'

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    constructor(private readonly deviceId: string, private readonly username: string,
        private readonly password: string, private readonly authenticationService: AuthenticationService,
        private readonly authenticationCache: VehicleRemoteAuthenticationCache) { }

    authenticateAndGetDetails = async (): Promise<AuthenticationResult> => {
        const cachedAuthentication = this.authenticationCache.getCachedAuthentication();

        if (!cachedAuthentication.isExpired) {
            return cachedAuthentication.details;
        }

        const { authResponse, userId } = await this.authenticate();
        const authenticationDetails: AuthenticationResult = { accessToken: authResponse.access_token, userId: userId };

        this.authenticationCache.cacheAuthentication(authenticationDetails, parseInt(authResponse.expires_in));

        return authenticationDetails;
    }

    private async authenticate(): Promise<{ authResponse: Auth, userId: string }> {
        const authResponse = await this.authenticationService.authenticate(this.deviceId, this.username, this.password);
        await this.authenticationService.registerDevice(authResponse.access_token, this.deviceId, authResponse.authorization_token, authResponse.expires_in, this.username);
        const loginUserResponse = await this.authenticationService.loginUser(authResponse.access_token, this.deviceId, this.username);
        return { authResponse, userId: loginUserResponse.userId };
    }
}
export { JlrVehicleRemoteAuthenticator }
