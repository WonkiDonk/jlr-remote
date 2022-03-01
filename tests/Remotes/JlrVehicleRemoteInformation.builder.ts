import { VehicleRemoteAuthenticator, VehicleRemoteInformation } from '../../src/Remotes/Types'
import { createMock } from 'ts-auto-mock'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'
import { JlrVehicleRemoteInformation } from '../../src/Remotes/JlrVehicleRemoteInformation'

class JlrVehicleRemoteInformationBuilder {
    public deviceId?: string
    public vin?: string
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public queryVehicleInformationService?: QueryVehicleInformationService
    public vehicleStatusMapper?: VehicleStatusMapper
    
    public build: () => VehicleRemoteInformation = () => {
        return new JlrVehicleRemoteInformation(
            this.deviceId || '',
            this.vin || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.queryVehicleInformationService || createMock<QueryVehicleInformationService>(),
            this.vehicleStatusMapper || createMock<VehicleStatusMapper>())
    }
}

export { JlrVehicleRemoteInformationBuilder }
