import { VehicleRemoteAuthenticator } from './Types'
import { AuthenticationService } from "../../src/Authentication/AuthenticationService"

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    constructor(private readonly deviceId: string, private readonly username: string, 
        private readonly password: string, private readonly authenticationService: AuthenticationService) { }

    getAccessToken = async (): Promise<string> => {
        await this.authenticationService.authenticate(this.deviceId, this.username, this.password)
        await this.authenticationService.registerDevice('', '', '', '', '')
        await this.authenticationService.loginUser('', '', '')
        
        return ''
    }
}

export { JlrVehicleRemoteAuthenticator }
