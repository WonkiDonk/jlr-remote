import {QueryVehicleInformationService} from '../Services/QueryVehicleInformationService'

class VehicleRemote {
    private readonly service: QueryVehicleInformationService
    constructor(queryVehicleInformationService: QueryVehicleInformationService) {
        this.service = queryVehicleInformationService
    }

    getVehicleAttributes = (): Promise<any> => {
        return this.service.getVehicleAttributes('', '', '')
    }
}

export { VehicleRemote }
