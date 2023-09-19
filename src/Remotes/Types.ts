import { VehicleAttributes, VehicleAlert } from '../JaguarLandRover/ServiceTypes'

/**
 * Allowed values for locked states.
 */
type JlrLockState = 'LOCKED' | 'UNLOCKED' | string

/**
 * Allow values for charger states.
 */
type JlrChargerState = 'CHARGING' | 'NOT_CHARGING' | string

/**
 * Defines the core vehicle status.
 */
type CoreVehicleStatus = {
    TU_STATUS_PRIMARY_VOLT: string,
    TU_STATUS_PRIMARY_CHARGE_PERCENT: string,
    DOOR_IS_ALL_DOORS_LOCKED: JlrLockState,
    TU_STATUS_GSM_MODEM: string,
    TU_STATUS_IMEI: string,
    CLIMATE_STATUS_TIMER1_DAY: string,
    BATTERY_STATUS: string,
    WASHER_FLUID_WARN: string,
    DOOR_FRONT_LEFT_POSITION: string,
    TU_STATUS_SLEEP_CYCLES_START_TIME: string,
    DOOR_REAR_RIGHT_POSITION: string,
    TU_STATUS_GNSS_ANTENNA: string,
    ENGINE_COOLANT_TEMP: string,
    DISTANCE_TO_EMPTY_FUEL: string,
    CLIMATE_STATUS_REMAINING_RUNTIME: string,
    ODOMETER_MILES_RESOLUTION: string,
    SERVICE_MODE_START: string,
    TYRE_STATUS_REAR_LEFT: string,
    ODOMETER_MILES: string,
    TU_STATUS_SECONDARY_VOLT: string,
    ARM_REST_SECOND_ROW_STATUS: string,
    SRS_STATUS: string,
    DOOR_REAR_RIGHT_LOCK_STATUS: JlrLockState,
    IS_PANIC_ALARM_TRIGGERED: string,
    DOOR_FRONT_RIGHT_POSITION: string,
    BRAKE_FLUID_WARN: string,
    DRV_SEAT_THIRD_ROW_INHIBITION: string,
    DOOR_REAR_LEFT_LOCK_STATUS: JlrLockState,
    TU_STATUS_MOBILE_PHONE_CONNECTED: string,
    TU_STATUS_SW_VERSION_CONFIG: string,
    EXT_OIL_LEVEL_WARN: string,
    DRV_SEAT_THIRD_ROW_STATUS: string,
    TU_STATUS_MIC: string,
    TU_STATUS_POWER: string,
    DOOR_ENGINE_HOOD_POSITION: string,
    TRANSPORT_MODE_START: string,
    EXT_BULB_STATUS_LEFT_TURN_ANY: string,
    ENG_COOLANT_LEVEL_WARN: string,
    WINDOW_FRONT_RIGHT_STATUS: string,
    WINDOW_REAR_RIGHT_STATUS: string,
    TU_STATUS_INT_RTC: string,
    TYRE_STATUS_FRONT_LEFT: string,
    THEFT_ALARM_STATUS: string,
    IS_SUNROOF_OPEN: string,
    ODOMETER: string,
    EXT_KILOMETERS_TO_SERVICE: string,
    TU_STATUS_DAYS_SINCE_GNSS_FIX: string,
    PAS_SEAT_SECOND_ROW_STATUS: string,
    TU_STATUS_BUTTONS: string,
    PAS_SEAT_THIRD_ROW_STATUS: string,
    VEHICLE_STATE_TYPE: string,
    DOOR_ENGINE_HOOD_LOCK_STATUS: JlrLockState,
    TYRE_STATUS_FRONT_RIGHT: string,
    PRIVACY_SWITCH: string,
    TU_STATUS_EXT_POWER: string,
    CLIMATE_STATUS_TIMER1_MINUTE: string,
    LATEST_COMPLETE_CONFIG_UPDATE: string,
    TU_STATUS_HANDSET: string,
    BRAZIL_EVENT_MODE: string,
    IS_CRASH_SITUATION: string,
    DOOR_FRONT_RIGHT_LOCK_STATUS: JlrLockState,
    TYRE_PRESSURE_REAR_RIGHT: string,
    TU_STATUS_CONFIG_VERSION: string,
    CLIMATE_STATUS_TIMER2_DAY: string,
    DOOR_FRONT_LEFT_LOCK_STATUS: JlrLockState,
    WINDOW_REAR_LEFT_STATUS: string,
    PAS_SEAT_FIRST_ROW_INHIBITION: string,
    DRV_SEAT_SECOND_ROW_STATUS: string,
    TU_STATUS_EXT_HANDSFREE: string,
    PAS_SEAT_FIRST_ROW_STATUS: string,
    CLIMATE_STATUS_FFH_REMAINING_RUNTIME: string,
    CLIMATE_STATUS_VENTING_TIME: string,
    TYRE_PRESSURE_FRONT_RIGHT: string,
    FUEL_LEVEL_PERC: string,
    CLIMATE_STATUS_TIMER2_MONTH: string,
    PAS_SEAT_THIRD_ROW_INHIBITION: string,
    DOOR_IS_BOOT_LOCKED: JlrLockState,
    TU_STATUS_SW_VERSION_SECONDARY: string,
    DOOR_BOOT_POSITION: string,
    IS_HEAD_LIGHTS_ON: string,
    TU_STATUS_CRASH_INPUT: string,
    SERVICE_MODE_STOP: string,
    TYRE_PRESSURE_FRONT_LEFT: string,
    CLIMATE_STATUS_TIMER2_MINUTE: string,
    IS_CAB_OPEN: string,
    TU_STATUS_USES_EXTERNAL_GNSS: string,
    ODOMETER_METER_RESOLUTION: string,
    TU_STATUS_GSM_EXT_ANTENNA: string,
    CLIMATE_STATUS_TIMER2_HOUR: string,
    ARM_REST_SECOND_ROW_INHIBITION: string,
    ODOMETER_METER: string,
    BATTERY_VOLTAGE: string,
    TU_STATUS_SPEAKER: string,
    TRANSPORT_MODE_STOP: string,
    ENGINE_BLOCK: string,
    TYRE_PRESSURE_REAR_LEFT: string,
    CLIMATE_STATUS_TIMER_ACTIVATION_STATUS: string,
    TU_STATUS_GNSS: string,
    TU_STATUS_SW_VERSION_MAIN: string,
    TU_STATUS_INT_POWER: string,
    TU_STATUS_HW_VERSION: string,
    PAS_SEAT_SECOND_ROW_INHIBITION: string,
    WINDOW_FRONT_LEFT_STATUS: string,
    DOOR_REAR_LEFT_POSITION: string,
    CLIMATE_STATUS_OPERATING_STATUS: string,
    CLIMATE_STATUS_TIMER1_HOUR: string,
    CLIMATE_STATUS_TIMER1_MONTH: string,
    TU_STATUS_SERIAL_NUMBER: string,
    TYRE_STATUS_REAR_RIGHT: string,
    TU_ACTIVATION_STATUS: string,
    DRV_SEAT_SECOND_ROW_INHIBITION: string,
    DOOR_BOOT_LOCK_STATUS: JlrLockState,
    TU_STATUS_CAN: string
}

/**
 * Defines the electric vehicle status.
 */
type ElectricVehicleStatus = {
    EV_NEXT_DEPARTURE_TIMER_IS_SET: string,
    EV_RANGE_ON_BATTERY_MILES: string,
    EV_CHARGING_STATUS: JlrChargerState,
    EV_RANGE_COMFORTx10: string,
    EV_IS_PLUGGED_IN: string,
    EV_CHARGING_METHOD: string,
    EV_RANGE_VSC_VEH_ACCEL_FACTOR: string,
    EV_PERMANENT_MAX_SOC_CHARGE_SETTING_CHOICE: string,
    EV_RANGE_VSC_REGEN_ENERGY_AVAILABLEx100: string,
    EV_NEXT_DEPARTURE_TIMER_TIME_HOUR: string,
    EV_CHARGING_RATE_KM_PER_HOUR: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD1: string,
    EV_RANGE_VSC_RANGE_MAP_REFACTR_COMF: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD2: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD3: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD4: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD5: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD6: string,
    EV_RANGE_VSC_HV_BATTERY_CONSUMPTION_SPD7: string,
    EV_STATE_OF_CHARGE: string,
    EV_RANGE_VSC_REVISED_HV_BATT_ENERGYx100: string,
    EV_NEXT_DEPARTURE_TIMER_DATE_YEAR: string,
    EV_IS_CHARGING: string,
    EV_RANGE_VSC_HV_ENERGY_TIME_PENx100: string,
    EV_PRECONDITION_PRIORITY_SETTING: string,
    EV_BATTERY_PRECONDITIONING_STATUS: string,
    EV_NEXT_DEPARTURE_TIMER_DATE_DAY: string,
    EV_PHEV_RANGE_COMBINED_KM: string,
    EV_RANGE_VSC_RANGE_MAP_REFACTR_ECO: string,
    EV_MINUTES_TO_BULK_CHARGED: string,
    EV_CHARGING_MODE_CHOICE: string,
    EV_ENERGY_CONSUMED_LAST_CHARGE_KWH: string,
    EV_PHEV_RANGE_COMBINED_MILES: string,
    EV_RANGE_ON_BATTERY_KM: string,
    EV_RANGE_PREDICT_STATUS: string,
    EV_RANGE_VSC_INITIAL_HV_BATT_ENERGYx100: string,
    EV_RANGE_VSC_HV_ENERGY_DESCENTx10: string,
    EV_NEXT_DEPARTURE_TIMER_TIME_MINUTE: string,
    EV_ONE_OFF_MAX_SOC_CHARGE_SETTING_CHOICE: string
}

type VehicleStatus = {
    core: CoreVehicleStatus,
    ev: ElectricVehicleStatus
}

/**
 * Defines the current vehicle status.
 */
type CurrentVehicleStatus = {
    vehicleStatus: VehicleStatus,
    vehicleAlerts: VehicleAlert[],
    lastUpdatedTime: Date
}

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
 * Details of a cached authentication.
 */
type ValidAuthentication = {
    token: string,
    isExpired: false
}

/**
 * Expired authentication.
 */
type ExpiredAuthentication = {
    isExpired: true
}

/**
 * Cached authentication.
 */
type CachedAuthentication = ValidAuthentication | ExpiredAuthentication

/**
 * Caches and returns caches access tokens.
 */
interface VehicleRemoteAuthenticationCache {
    cacheAuthentication: (accessToken: string, expiresIn: Number) => void
    getCachedAuthentication: () => CachedAuthentication
}

/**
 * Gets remote vehicle information.
 */
interface VehicleRemoteInformation {
    /**
     * Gets attributes of the vehicle.
     */
    getVehicleAttributes: () => Promise<VehicleAttributes>

    /**
     * Gets the current vehicle status.
     */
    getVehicleStatus: () => Promise<CurrentVehicleStatus>
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
    getLockState(): Promise<LockState>
}

/**
 * Defines the EV charge state.
 */
type ChargeState = {
    /**
     * Gets the percentage charge of the electric vehicle's high voltage battery.
     */
    chargeLevel?: number

    /**
     * Gets whether the electric vehicle is charging.
     */
    isCharging?: boolean

    /**
     * Gets whether the electric vehicle is connected to a charger.
     */
    isConnected?: boolean
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
    startCharging: () => Promise<void>

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
    CurrentVehicleStatus,
    ElectricVehicleRemote,
    ElectricVehicleRemoteControl,
    CachedAuthentication,
    ExpiredAuthentication,
    InternalCombustionEngineVehicleRemote,
    InternalCombustionEngineVehicleRemoteControl,
    LockState,
    VehicleRemote,
    VehicleRemoteAuthenticator,
    VehicleRemoteAuthenticationCache,
    VehicleRemoteControl,
    VehicleRemoteInformation
}