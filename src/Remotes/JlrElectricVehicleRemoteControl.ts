import { ElectricVehicleRemoteControl, ChargeState } from './Types';
import { VehicleRemoteAuthenticator } from './Types';
import { CommandElectricVehicleService } from '../Services/CommandElectricVehicleService';
import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService';

class JlrElectricVehicleRemoteControl implements ElectricVehicleRemoteControl {
    public type: 'EV' = 'EV'

    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly userId: string,
        private readonly lastFourOfVin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandElectricVehicleService: CommandElectricVehicleService,
        private readonly commandAuthenticationService: CommandAuthenticationService) {}

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
        const cpToken = await this.commandAuthenticationService.getCpToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)

        await this.commandElectricVehicleService.startCharging(accessToken, this.deviceId, this.vin, '')
    }

    stopCharging = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    getChargeState = (): Promise<ChargeState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrElectricVehicleRemoteControl }
