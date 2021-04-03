interface VehicleRemoteAuthenticator {
    getAccessToken: () => Promise<string>
}

interface VehicleRemoteInformation { 
    getVehicleAttributes: () => Promise<any>
    getVehicleStatus: () => Promise<any>
}

type LockState = {
    isLocked: boolean
}

interface VehicleRemoteControl {
    beepAndFlash: () => Promise<void>
    lock(): Promise<void>
    unlock(): Promise<void>
    getLockState() : Promise<LockState>
}

interface InternalCombustionEngineVehicleRemoteControl {
    type: 'ICE'
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    turnOffClimateControl: () => Promise<void>
    isClimateControlOn: () => Promise<boolean>
    turnOnEngine: () => Promise<void>
    turnOffEngine: () => Promise<void>
    isEngineOn: () => Promise<boolean>
}

type ChargeState = {
    chargeLevel: number
    isCharging: boolean
    isConnected: boolean
}

interface ElectricVehicleRemoteControl {
    type: 'EV'
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    turnOffClimateControl: () => Promise<void>
    isClimateControlOn: () => Promise<boolean>
    startCharing: () => Promise<void>
    stopCharging: () => Promise<void>
    getChargeState: () => Promise<ChargeState>
}

type ElectricVehicleRemote = VehicleRemoteInformation
    & VehicleRemoteControl
    & ElectricVehicleRemoteControl

type InternalCombustionEngineVehicleRemote = VehicleRemoteInformation
    & VehicleRemoteControl
    & InternalCombustionEngineVehicleRemoteControl

type VehicleRemote = ElectricVehicleRemote | InternalCombustionEngineVehicleRemote

export {
    VehicleRemoteAuthenticator,
    VehicleRemote,
    ElectricVehicleRemote,
    InternalCombustionEngineVehicleRemote,
    VehicleRemoteInformation,
    VehicleRemoteControl,
    ElectricVehicleRemoteControl,
    InternalCombustionEngineVehicleRemoteControl
}
