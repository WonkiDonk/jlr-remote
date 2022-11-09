import { QueryVehicleInformationService } from '../Services/QueryVehicleInformationService'
import { VehicleStatusMapper } from './Mappers'
import { VehicleRemoteAuthenticator, VehicleRemoteInformation, CurrentVehicleStatus } from './Types'

class JlrVehicleRemoteInformation implements VehicleRemoteInformation {
    constructor(
        private readonly deviceId: string,
        private readonly vin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly queryVehicleInformationService: QueryVehicleInformationService,
        private readonly vehicleStatusMapper: VehicleStatusMapper) { }

    getVehicleAttributes = async (): Promise<any> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        
        return await this.queryVehicleInformationService.getVehicleAttributes(accessToken, this.deviceId, this.vin)
    }

    getVehicleStatus = async (): Promise<CurrentVehicleStatus> => { 
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const serviceStatus = await this.queryVehicleInformationService.getVehicleStatusV3(accessToken, this.deviceId, this.vin)

        return this.vehicleStatusMapper.map(serviceStatus)
    }
}

export { JlrVehicleRemoteInformation }
