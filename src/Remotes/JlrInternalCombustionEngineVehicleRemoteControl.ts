import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService'
import { CommandIceVehicleService } from '../Services/CommandIceVehicleService'
import { InternalCombustionEngineVehicleRemoteControl } from './Types'
import { VehicleRemoteAuthenticator } from './Types'

class JlrInternalCombustionEngineVehicleRemoteControl implements InternalCombustionEngineVehicleRemoteControl {
    public type: 'ICE' = 'ICE'

    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandIceVehicleService: CommandIceVehicleService,
        private readonly commandAuthenticationService: CommandAuthenticationService) { }

    turnOnClimateControl = (targetTemperature: number): Promise<void> => {
        throw new Error('Not implemented.')
    }

    turnOffClimateControl = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isClimateControlOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }

    turnOnEngine = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const reonToken = await this.commandAuthenticationService.getReonToken(accessToken, '', '', '', '')
    
        await this.commandIceVehicleService.remoteEngineStart(accessToken, this.deviceId, this.vin, '')
    }

    turnOffEngine = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isEngineOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControl }
