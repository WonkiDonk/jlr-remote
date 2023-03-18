import { ElectricVehicleRemoteControl, ChargeState } from './Types';
import { VehicleRemoteAuthenticator } from './Types';
import { CommandElectricVehicleService } from '../Services/CommandElectricVehicleService';

class JlrElectricVehicleRemoteControl implements ElectricVehicleRemoteControl {
    public type: 'EV' = 'EV'

    constructor(
        private readonly deviceId: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandElectricVehicleService: CommandElectricVehicleService) {}

    turnOnClimateControl = (targetTemperature: number): Promise<void> => {
        throw new Error('Not implemented.')
    }

    turnOffClimateControl = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isClimateControlOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }

    startCharging = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
     
        await this.commandElectricVehicleService.startCharging(accessToken, this.deviceId, '', '')
    }

    stopCharging = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    getChargeState = (): Promise<ChargeState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrElectricVehicleRemoteControl }
