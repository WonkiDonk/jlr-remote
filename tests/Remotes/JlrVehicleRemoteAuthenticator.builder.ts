import { createMock } from 'ts-auto-mock'
import { AuthenticationService } from '../../src/Authentication/AuthenticationService'
import { VehicleRemoteAuthenticationCache, ExpiredAuthentication } from '../../src/Remotes/Types'
import { JlrVehicleRemoteAuthenticator } from '../../src/Remotes/JlrVehicleRemoteAuthenticator'

class JlrVehicleRemoteAuthenticatorBuilder {
    public deviceId?: string
    public username?: string
    public password?: string
    public authenticatorCache?: VehicleRemoteAuthenticationCache
    public authenticationService?: AuthenticationService

    private createMockAuthenticatorCache() {
        const authenticatorCache = createMock<VehicleRemoteAuthenticationCache>()
        const cachedAuthentication: ExpiredAuthentication = {
            isExpired: true,
        }
        authenticatorCache.getCachedAuthentication = jest.fn(() => cachedAuthentication)

        return authenticatorCache
    }

    public build: () => JlrVehicleRemoteAuthenticator = () => {
        return new JlrVehicleRemoteAuthenticator(
            this.deviceId || '',
            this.username || '',
            this.password || '',
            this.authenticationService || createMock<AuthenticationService>(),
            this.authenticatorCache || this.createMockAuthenticatorCache(),
        )
    }
}

export { JlrVehicleRemoteAuthenticatorBuilder }
