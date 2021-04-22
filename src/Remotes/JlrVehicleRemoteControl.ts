import { LockState, VehicleRemoteAuthenticator, VehicleRemoteControl } from './Types'
import { CommandVehicleService } from '../Services/CommandVehicleService'
import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService'

class JlrVehicleRemoteControl implements VehicleRemoteControl {
    constructor(private readonly deviceId: string, private readonly vin: string,
        private readonly userId: string, private readonly lastFourOfVin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandAuthenticationService: CommandAuthenticationService,
        private readonly commandVehicleService: CommandVehicleService) { }
        
    beepAndFlash = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getHblfToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)
        const hblfToken = commandToken.token

        await this.commandVehicleService.honkHorn(accessToken, this.deviceId, this.vin, hblfToken)
    }

    lock = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()

        await this.commandVehicleService.lockVehicle(accessToken, '', '', '')
    }
    
    unlock = (): Promise<void> => {
        throw new Error('Not implemented.')
    }
    
    getLockState = (): Promise<LockState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrVehicleRemoteControl }
