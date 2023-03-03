import { CommandIceVehicleService } from '../Services/CommandIceVehicleService'
import { InternalCombustionEngineVehicleRemoteControl } from './Types'
import { VehicleRemoteAuthenticator } from './Types'

class JlrInternalCombustionEngineVehicleRemoteControl implements InternalCombustionEngineVehicleRemoteControl {
    public type: 'ICE' = 'ICE'

    constructor(
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandIceVehicleService: CommandIceVehicleService) { }

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
        // AccessToken
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        
        await this.commandIceVehicleService.remoteEngineStart(accessToken,'','','')

        // DeviceID
        const DeviceID = await this.vehicleRemoteAuthenticator.getDeviceID()

        await this.commandIceVehicleService.remoteEngineStart('',DeviceID, '', '')
    }

    turnOffEngine = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isEngineOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControl }
