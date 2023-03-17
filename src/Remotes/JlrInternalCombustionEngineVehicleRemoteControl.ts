import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService'
import { CommandIceVehicleService } from '../Services/CommandIceVehicleService'
import { InternalCombustionEngineVehicleRemoteControl } from './Types'
import { VehicleRemoteAuthenticator } from './Types'

class JlrInternalCombustionEngineVehicleRemoteControl implements InternalCombustionEngineVehicleRemoteControl {
    public type: 'ICE' = 'ICE'

    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly userId: string,
        private readonly userPin: string,
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
        const commandToken = await this.commandAuthenticationService.getReonToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)
        const reonToken = commandToken.token

        await this.commandIceVehicleService.remoteEngineStart(accessToken, this.deviceId, this.vin, reonToken)
    }

    turnOffEngine = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getReoffToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)
        const reoffToken = commandToken.token

        await this.commandIceVehicleService.remoteEngineStop(accessToken, this.deviceId, this.vin, reoffToken)
    }

    isEngineOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControl }
