import { JlrElectricVehicleRemoteControl } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Remotes/JlrElectricVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { CommandAuthenticationService } from "../../src/Authentication/CommandAuthenticationService";
import { QueryVehicleInformationService } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Services/QueryVehicleInformationService";
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types";
import { CommandElectricVehicleService } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Services/CommandElectricVehicleService"

class JlrElectricVehicleRemoteControlBuilder {
    public deviceId?: string
    public vin?: string
    public userId?: string
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public queryVehicleInformationService?: QueryVehicleInformationService
    public commandAuthenticationService?: CommandAuthenticationService
    public commandElectricVehicleService?: CommandElectricVehicleService

    public build: () => JlrElectricVehicleRemoteControl = () => {
        return new JlrElectricVehicleRemoteControl(
            this.deviceId || '',
            this.vin || '',
            this.userId || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.commandElectricVehicleService || createMock<CommandElectricVehicleService>(),
            this.commandAuthenticationService || createMock<CommandAuthenticationService>())
    }
}

export { JlrElectricVehicleRemoteControlBuilder }