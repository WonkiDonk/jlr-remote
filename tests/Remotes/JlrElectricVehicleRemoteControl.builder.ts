import { JlrElectricVehicleRemoteControl } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Remotes/JlrElectricVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { CommandAuthenticationService } from "../../src/Authentication/CommandAuthenticationService";
import { QueryVehicleInformationService } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Services/QueryVehicleInformationService";
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types";
import { CommandElectricVehicleService } from "c:/Users/dfier/Desktop/3. Projects/Will-Dani/jlr-remote/src/Services/CommandElectricVehicleService"

class JlrElectricVehicleRemoteControlBuilder {
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public queryVehicleInformationService?: QueryVehicleInformationService
    public commandAuthenticationService?: CommandAuthenticationService
    public commandElectricVehicleService?: CommandElectricVehicleService

    public build: () => JlrElectricVehicleRemoteControl = () => {
        return new JlrElectricVehicleRemoteControl(
            this.deviceId || '',
            this.vin || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.queryVehicleInformationService || createMock<QueryVehicleInformationService>(),
            this.commandAuthenticationService || createMock<CommandAuthenticationService>(),
            this.commandElectricVehicleService || createMock<CommandElectricVehicleService>())
    }
}

export { JlrElectricVehicleRemoteControlBuilder }