import { ElectricVehicleRemoteControl, ChargeState, CurrentVehicleStatus } from './Types';
import { VehicleRemoteAuthenticator } from './Types';
import { CommandElectricVehicleService } from '../Services/CommandElectricVehicleService';
import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService';
import { QueryVehicleInformationService } from '../Services/QueryVehicleInformationService';
import { VehicleStatusMapper } from './Mappers';

class JlrElectricVehicleRemoteControl implements ElectricVehicleRemoteControl {
    public type: 'EV' = 'EV'

    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly userId: string,
        private readonly lastFourOfVin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandElectricVehicleService: CommandElectricVehicleService,
        private readonly commandAuthenticationService: CommandAuthenticationService,
        private readonly queryVehicleInformationService: QueryVehicleInformationService,
        private readonly vehicleStatusMapper: VehicleStatusMapper) { }


    turnOnClimateControl = async (targetTemperature: number): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        await this.commandAuthenticationService.getEccToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)

        await this.commandElectricVehicleService.startClimatePreconditioning(accessToken, this.deviceId, this.vin, '', 0)
    }

    turnOffClimateControl = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isClimateControlOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }

    startCharging = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getCpToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)
        const cpToken = commandToken.token

        await this.commandElectricVehicleService.startCharging(accessToken, this.deviceId, this.vin, cpToken)
    }

    stopCharging = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getCpToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)
        const cpToken = commandToken.token

        await this.commandElectricVehicleService.stopCharging(accessToken, this.deviceId, this.vin, cpToken)
    }

    getChargeState = async (): Promise<ChargeState> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const serviceStatus = await this.queryVehicleInformationService.getVehicleStatusV3(accessToken, this.deviceId, this.vin)
        const status: CurrentVehicleStatus = this.vehicleStatusMapper.map(serviceStatus)

        const chargeLevel = parseInt(status.vehicleStatus.ev.EV_STATE_OF_CHARGE)

        return {
            isCharging: status.vehicleStatus.ev.EV_CHARGING_STATUS === 'CHARGING'
                ? true : status.vehicleStatus.ev.EV_CHARGING_STATUS === 'NOT_CHARGING'
                    ? false : undefined,
            isConnected: status.vehicleStatus.ev.EV_IS_PLUGGED_IN === 'CONNECTED'
                ? true : status.vehicleStatus.ev.EV_IS_PLUGGED_IN === 'NOT_CONNECTED'
                    ? false : undefined,
            chargeLevel: Number.isNaN(chargeLevel) ? undefined : chargeLevel
        }
    }
}

export { JlrElectricVehicleRemoteControl }
