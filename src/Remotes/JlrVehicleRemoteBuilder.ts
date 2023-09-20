import {
    ElectricVehicleRemote,
    ElectricVehicleRemoteControl,
    InternalCombustionEngineVehicleRemote,
    InternalCombustionEngineVehicleRemoteControl,
    VehicleRemote,
    VehicleRemoteAuthenticationCache,
    VehicleRemoteAuthenticator,
    VehicleRemoteBuilder,
    VehicleRemoteControl,
    VehicleRemoteInformation,
    VehicleType
} from "./Types";

class JlrVehicleRemoteBuilder implements VehicleRemoteBuilder {
    private buildElectricVehicleRemoteControl = (): ElectricVehicleRemoteControl => {
        throw new Error('Not implemented')
    }

    private buildInternalCombustionEngineVehicleRemoteControl = (): InternalCombustionEngineVehicleRemoteControl => {
        throw new Error('Not implemented')
    }

    private buildVehicleRemoteAuthenticationCache = (): VehicleRemoteAuthenticationCache => {
        throw new Error('Not implemented')
    }

    private buildVehicleRemoteAuthenticator = (): VehicleRemoteAuthenticator => {
        throw new Error('Not implemented')
    }

    private buildVehicleRemoteControl = (): VehicleRemoteControl => {
        throw new Error('Not implemented')
    }

    private buildVehicleRemoteInformation = (): VehicleRemoteInformation => {
        throw new Error('Not implemented')
    }

    private buildElectricVehicleRemote = (): ElectricVehicleRemote => {
        throw new Error('Not implemented')
    }

    private buildInternalCombustionEngineVehicleRemote = (): InternalCombustionEngineVehicleRemote => {
        throw new Error('Not implemented')
    }

    build = (vin: string, type: VehicleType): VehicleRemote =>
        type === 'EV'
            ? this.buildElectricVehicleRemote()
            : this.buildInternalCombustionEngineVehicleRemote()
    
}

export { JlrVehicleRemoteBuilder }
