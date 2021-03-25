import { QueryVehicleInformationService } from '../Services/QueryVehicleInformationService'
import { VehicleRemoteAuthenticator } from './VehicleRemoteAuthenticator'

class VehicleRemote {
    constructor(private readonly deviceId: string, private readonly vin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly queryVehicleInformationService: QueryVehicleInformationService) { }

    getVehicleAttributes = async (): Promise<any> => {
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        
        return this.queryVehicleInformationService.getVehicleAttributes(accessToken, this.deviceId, this.vin)
    }

    getVehicleStatus = async (): Promise<any> => { 
        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        
        return this.queryVehicleInformationService.getVehicleStatusV3(accessToken, '', '')
    }
}

export { VehicleRemote }
