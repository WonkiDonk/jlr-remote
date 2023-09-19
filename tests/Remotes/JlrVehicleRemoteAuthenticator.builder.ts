import { createMock } from 'ts-auto-mock'
import { AuthenticationService } from '../../src/Authentication/AuthenticationService'
import { JlrVehicleRemoteAuthenticator } from '../../src/Remotes/JlrVehicleRemoteAuthenticator'

class JlrVehicleRemoteAuthenticatorBuilder {
    public deviceId?: string
    public username?: string
    public password?: string
    public authenticationService?: AuthenticationService

    public build: () => JlrVehicleRemoteAuthenticator = () => {
        return new JlrVehicleRemoteAuthenticator(
            this.deviceId || '',
            this.username || '',
            this.password || '',
            this.authenticationService || createMock<AuthenticationService>(),
        )
    }
}

export { JlrVehicleRemoteAuthenticatorBuilder }
