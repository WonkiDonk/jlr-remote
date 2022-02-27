import { LockState, VehicleRemoteAuthenticator, VehicleRemoteControl } from './Types'
import { CommandAuthenticationService } from '../Authentication/CommandAuthenticationService'
import { CommandVehicleService } from '../Services/CommandVehicleService'
import { QueryVehicleInformationService } from '../Services/QueryVehicleInformationService'

class JlrVehicleRemoteControl implements VehicleRemoteControl {
    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly userId: string,
        private readonly lastFourOfVin: string,
        private readonly userPin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandAuthenticationService: CommandAuthenticationService,
        private readonly commandVehicleService: CommandVehicleService,
        private readonly queryVehicleInformationService: QueryVehicleInformationService) { }
        
    beepAndFlash = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getHblfToken(accessToken, this.deviceId, this.vin, this.userId, this.lastFourOfVin)
        const hblfToken = commandToken.token

        await this.commandVehicleService.honkHorn(accessToken, this.deviceId, this.vin, hblfToken)
    }

    lock = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getRdlToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)
        const rdlToken = commandToken.token

        await this.commandVehicleService.lockVehicle(accessToken, this.deviceId, this.vin, rdlToken)
    }
    
    unlock = async (): Promise<void> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const commandToken = await this.commandAuthenticationService.getRduToken(accessToken, this.deviceId, this.vin, this.userId, this.userPin)
        const rduToken = commandToken.token

        await this.commandVehicleService.unlockVehicle(accessToken, this.deviceId, this.vin, rduToken)
    }
    
    getLockState = async (): Promise<LockState> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        await this.queryVehicleInformationService.getVehicleStatusV3(accessToken, 'x', 'x')

        return { isLocked: false }
    }
}

export { JlrVehicleRemoteControl }
