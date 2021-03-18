import {QueryVehicleInformationService} from '../Services/QueryVehicleInformationService'

class VehicleRemote {
    private readonly service: QueryVehicleInformationService
    private readonly deviceId: string
    constructor(deviceId: string, private readonly vin: string, queryVehicleInformationService: QueryVehicleInformationService) {
        this.deviceId = deviceId
        this.service = queryVehicleInformationService
    }

    getVehicleAttributes = (): Promise<any> => {
        return this.service.getVehicleAttributes('', this.deviceId, this.vin)
    }
}

export { VehicleRemote }
