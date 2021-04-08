import { LockState, VehicleRemoteAuthenticator, VehicleRemoteControl } from './Types'
import { CommandVehicleService } from '../Services/CommandVehicleService'

class JlrVehicleRemoteControl implements VehicleRemoteControl {
    constructor(private readonly deviceId: string, private readonly vin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandVehicleService: CommandVehicleService) { }
        
    beepAndFlash = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()

        this.commandVehicleService.honkHorn(accessToken, '', '', '')
    }

    lock = (): Promise<void> => {
        throw new Error('Not implemented.')
    }
    
    unlock = (): Promise<void> => {
        throw new Error('Not implemented.')
    }
    
    getLockState = (): Promise<LockState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrVehicleRemoteControl }
