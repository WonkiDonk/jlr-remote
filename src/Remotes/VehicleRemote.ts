import {QueryVehicleInformationService} from '../Services/QueryVehicleInformationService'

class VehicleRemote {
    constructor(private readonly deviceId: string, private readonly vin: string, private readonly queryVehicleInformationService: QueryVehicleInformationService) {
        
    }

    getVehicleAttributes = (): Promise<any> => {
        return this.queryVehicleInformationService.getVehicleAttributes('', this.deviceId, this.vin)
    }
}

export { VehicleRemote }
