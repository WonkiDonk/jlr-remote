import {QueryVehicleInformationService} from '../Services/QueryVehicleInformationService'

class VehicleRemote {
    constructor(private readonly deviceId: string, private readonly vin: string, private readonly service: QueryVehicleInformationService) {
        this.deviceId = deviceId
        this.vin = vin
        this.service = service
    }

    getVehicleAttributes = (): Promise<any> => {
        return this.service.getVehicleAttributes('', this.deviceId, this.vin,)
    }
}

export { VehicleRemote }
