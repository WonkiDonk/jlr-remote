import { JlrVehicleRemoteControl } from '../../src/Remotes/JlrVehicleRemoteControl'
import { VehicleRemoteAuthenticator, VehicleRemoteControl } from '../../src/Remotes/Types'
import { createMock } from 'ts-auto-mock'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { CommandVehicleService } from '../../src/Services/CommandVehicleService'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'

class JlrVehicleRemoteControlBuilder {
    public deviceId?: string
    public vin?: string
    public userId?: string
    public lastFourOfVin?: string
    public userPin?: string
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public commandAuthenticationService?: CommandAuthenticationService
    public commandVehicleService?: CommandVehicleService
    public queryVehicleInformationService?: QueryVehicleInformationService
    public vehicleStatusMapper?: VehicleStatusMapper
    
    public build: () => VehicleRemoteControl = () => {
        return new JlrVehicleRemoteControl(
            this.deviceId || '',
            this.vin || '',
            this.userId || '',
            this.lastFourOfVin || '',
            this.userPin || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.commandAuthenticationService || createMock<CommandAuthenticationService>(),
            this.commandVehicleService || createMock<CommandVehicleService>(),
            this.queryVehicleInformationService || createMock<QueryVehicleInformationService>(),
            this.vehicleStatusMapper || createMock<VehicleStatusMapper>())
    }
}

export { JlrVehicleRemoteControlBuilder }
