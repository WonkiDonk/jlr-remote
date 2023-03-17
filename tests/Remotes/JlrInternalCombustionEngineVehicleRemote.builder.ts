import { JlrInternalCombustionEngineVehicleRemoteControl } from "../../src/Remotes/JlrInternalCombustionEngineVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { CommandIceVehicleService } from '../../src/Services/CommandIceVehicleService'

class JlrInternalCombustionEngineVehicleRemoteControlBuilder {
    public deviceId?: string
    public vin?: string
    public userId?: string
    public userPin?: string
    public vehicleRemoteAuthenticator?: VehicleRemoteAuthenticator
    public commandIceVehicleService?: CommandIceVehicleService
    public commandAuthenticationService?: CommandAuthenticationService
    
    public build: () => JlrInternalCombustionEngineVehicleRemoteControl = () => {
        return new JlrInternalCombustionEngineVehicleRemoteControl(
            this.deviceId || '',
            this.vin || '',
            this.userId || '',
            this.userPin || '',
            this.vehicleRemoteAuthenticator || createMock<VehicleRemoteAuthenticator>(),
            this.commandIceVehicleService || createMock<CommandIceVehicleService>(),
            this.commandAuthenticationService || createMock<CommandAuthenticationService>())
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControlBuilder }