/**
 * Gets access tokens for remote vehicle operations.
 */
interface VehicleRemoteAuthenticator {
    getAccessToken: () => Promise<string>
}

/**
 * Gets remote vehicle information.
 */
interface VehicleRemoteInformation { 
    getVehicleAttributes: () => Promise<any>
    getVehicleStatus: () => Promise<any>
}

/**
 * Defines the vehicle lock state.
 */
type LockState = {
    isLocked: boolean
}

/**
 * Performs common remote vehicle operations.
 */
interface VehicleRemoteControl {
    beepAndFlash: () => Promise<void>
    lock(): Promise<void>
    unlock(): Promise<void>
    getLockState() : Promise<LockState>
}

/**
 * Performs remote operations on vehicles with internal combustion engines (ICEs).
 */
interface InternalCombustionEngineVehicleRemoteControl {
    type: 'ICE'
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    turnOffClimateControl: () => Promise<void>
    isClimateControlOn: () => Promise<boolean>
    turnOnEngine: () => Promise<void>
    turnOffEngine: () => Promise<void>
    isEngineOn: () => Promise<boolean>
}

/**
 * Defines the EV charge state.
 */
type ChargeState = {
    chargeLevel: number
    isCharging: boolean
    isConnected: boolean
}

/**
 * Performs remote operations on electric vehicles (EVs).
 */
interface ElectricVehicleRemoteControl {
    type: 'EV'
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    turnOffClimateControl: () => Promise<void>
    isClimateControlOn: () => Promise<boolean>
    startCharing: () => Promise<void>
    stopCharging: () => Promise<void>
    getChargeState: () => Promise<ChargeState>
}

/**
 * Remote for controlling an electric vehicle (EVs).
 */
type ElectricVehicleRemote = VehicleRemoteInformation
    & VehicleRemoteControl
    & ElectricVehicleRemoteControl

/**
 * Remote for controlling a vehicle with an internal combustion engine (ICEs).
 */
type InternalCombustionEngineVehicleRemote = VehicleRemoteInformation
    & VehicleRemoteControl
    & InternalCombustionEngineVehicleRemoteControl

/**
 * Remote for controlling a vehicle.
 */
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
