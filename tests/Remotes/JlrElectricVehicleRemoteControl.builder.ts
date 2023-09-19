import { createMock } from 'ts-auto-mock'
import { JlrElectricVehicleRemoteControl } from '../../src/Remotes/JlrElectricVehicleRemoteControl'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { QueryVehicleInformationService } from '../../src/Services/QueryVehicleInformationService'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CommandElectricVehicleService } from '../../src/Services/CommandElectricVehicleService'
import { VehicleStatusMapper } from '../../src/Remotes/Mappers'

class JlrElectricVehicleRemoteControlBuilder {
    public deviceId?: string
    public vin?: string
    public userId?: string
    public lastFourOfVin?: string
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public queryVehicleInformationService?: QueryVehicleInformationService
    public commandAuthenticationService?: CommandAuthenticationService
    public commandElectricVehicleService?: CommandElectricVehicleService
    public vehicleStatusMapper?: VehicleStatusMapper

    public build: () => JlrElectricVehicleRemoteControl = () => {
        return new JlrElectricVehicleRemoteControl(
            this.deviceId || '',
            this.vin || '',
            this.userId || '',
            this.lastFourOfVin || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.commandElectricVehicleService || createMock<CommandElectricVehicleService>(),
            this.commandAuthenticationService || createMock<CommandAuthenticationService>(),
            this.queryVehicleInformationService || createMock<QueryVehicleInformationService>(),
            this.vehicleStatusMapper || createMock<VehicleStatusMapper>())
    }
}

export { JlrElectricVehicleRemoteControlBuilder }