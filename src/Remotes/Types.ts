/**
 * Gets access tokens for remote vehicle operations.
 */
interface VehicleRemoteAuthenticator {
    /**
     * Gets access tokens required to remotely interact with a vehicle.
     */
    getAccessToken: () => Promise<string>
}

/**
 * Gets remote vehicle information.
 */
interface VehicleRemoteInformation { 
    /**
     * Gets attributes of the vehicle.
     */
    getVehicleAttributes: () => Promise<any>

    /**
     * Gets the current vehicle status.
     */
    getVehicleStatus: () => Promise<any>
}

/**
 * Defines the vehicle lock state.
 */
type LockState = {
    /**
     * Indicates whether the vehicle is locked.
     */
    isLocked: boolean
}

/**
 * Performs common remote vehicle operations.
 */
interface VehicleRemoteControl {
    /**
     * Beep horn and flash the vehicle lights.
     */
    beepAndFlash: () => Promise<void>

    /**
     * Lock the vehicle.
     */
    lock(): Promise<void>

    /**
     * Unlock the vehicle.
     */
    unlock(): Promise<void>

    /**
     * Get the current vehicle lock state.
     */
    getLockState() : Promise<LockState>
}

/**
 * Defines the EV charge state.
 */
 type ChargeState = {
    /**
     * Gets the percentage charge of the electric vehicle's high voltage battery.
     */
    chargeLevel: number
    
    /**
     * Gets whether the electric vehicle is charging.
     */
    isCharging: boolean
    
    /**
     * Gets whether the electric vehicle is connected to a charger.
     */
    isConnected: boolean
}

/**
 * Performs remote operations on electric vehicles (EVs).
 */
interface ElectricVehicleRemoteControl {
    /**
     * Type of the vehicle.
     */
    type: 'EV'
    
    /**
     * Turns on the electric vehicle's climate control with the specified target temperature.
     * 
     * @param targetTemperature Target Temperature.
     */
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    
    /**
     * Turns off the electric vehicle's climate control.
     */
    turnOffClimateControl: () => Promise<void>
    
    /**
     * Gets whether the electric vehicle's climate control is turned on.
     */
    isClimateControlOn: () => Promise<boolean>
    
    /**
     * Starts the electric vehicle charging.
     */
    startCharing: () => Promise<void>
    
    /**
     * Stops the electric vehicle charing.
     */
    stopCharging: () => Promise<void>
    
    /**
     * Gets the electric vehicle charge state.
     */
    getChargeState: () => Promise<ChargeState>
}

/**
 * Performs remote operations on vehicles with internal combustion engines (ICEs).
 */
interface InternalCombustionEngineVehicleRemoteControl {
    /**
     * Type of the vehicle.
     */
    type: 'ICE'
    
    /**
     * Turns on the engine and sets the vehicle's climate control to the specified target temperature.
     * 
     * @param targetTemperature Target Temperature.
     */
    turnOnClimateControl: (targetTemperature: number) => Promise<void>
    
    /**
     * Turns off the vehicle's engine and climate control.
     */
    turnOffClimateControl: () => Promise<void>
    
    /**
     * Gets whether the vehicle's climate control is turned on.
     */
    isClimateControlOn: () => Promise<boolean>
    
    /**
     * Turns on the vehicle's internal combustion engine.
     */
    turnOnEngine: () => Promise<void>
    
    /**
     * Turns off the vehicle's internal combustion engine.
     */
    turnOffEngine: () => Promise<void>
    
    /**
     * Gets whether the vehicle's internal combustion engine is on.
     */
    isEngineOn: () => Promise<boolean>
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
    ChargeState,
    ElectricVehicleRemote,
    ElectricVehicleRemoteControl,
    InternalCombustionEngineVehicleRemote,
    InternalCombustionEngineVehicleRemoteControl,
    LockState,
    VehicleRemote,
    VehicleRemoteAuthenticator,
    VehicleRemoteControl,
    VehicleRemoteInformation
}
