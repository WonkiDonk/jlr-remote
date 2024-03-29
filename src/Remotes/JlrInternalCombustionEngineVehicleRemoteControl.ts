import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService'
import { CommandIceVehicleService } from '../Services/CommandIceVehicleService'
import { QueryVehicleInformationService } from '../Services/QueryVehicleInformationService'
import { VehicleStatusMapper } from './Mappers'
import { CurrentVehicleStatus, InternalCombustionEngineVehicleRemoteControl } from './Types'
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
        private readonly commandAuthenticationService: CommandAuthenticationService,
        private readonly queryVehicleInformationService: QueryVehicleInformationService,
        private readonly vehicleStatusMapper: VehicleStatusMapper,
        ) { }

    private getCurrentVehicleStatus = async () => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const serviceStatus = await this.queryVehicleInformationService.getVehicleStatusV3(accessToken, this.deviceId, this.vin)
        
        return this.vehicleStatusMapper.map(serviceStatus)
    }

    turnOnClimateControl = async (targetTemperature: number): Promise<void> => {
        await this.turnOnEngine()

        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getProvToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)

        await this.commandIceVehicleService.enableProvisioningMode(accessToken, this.deviceId, this.vin, commandToken.token)
        await this.commandIceVehicleService.setRemoteClimateControlTargetTemperature(accessToken, this.deviceId, this.vin, targetTemperature)
    }

    turnOffClimateControl = async (): Promise<void> => {
        await this.turnOffEngine()
    }

    isClimateControlOn = async (): Promise<boolean> => {
        const status = await this.getCurrentVehicleStatus()

        return status.vehicleStatus.core.CLIMATE_STATUS_OPERATING_STATUS === 'HEATING'
    }

    turnOnEngine = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getReonToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)

        await this.commandIceVehicleService.remoteEngineStart(accessToken, this.deviceId, this.vin, commandToken.token)
    }

    turnOffEngine = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getReoffToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)

        await this.commandIceVehicleService.remoteEngineStop(accessToken, this.deviceId, this.vin, commandToken.token)
    }

    isEngineOn = async (): Promise<boolean> => {
        const status = await this.getCurrentVehicleStatus()

        return status.vehicleStatus.core.VEHICLE_STATE_TYPE === 'KEY_ON_ENGINE_ON'
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControl }
