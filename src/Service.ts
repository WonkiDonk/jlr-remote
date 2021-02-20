import {
    ContactInformation,
    CurrentVehicleStatus,
    CurrentVehicleResponseV3,
    ReverseGeocode,
    ServiceError,
    ServiceStatus,
    UserInfo,
    VehicleAttributes,
    VehicleContactInformation,
    VehicleDepartureTimers,
    VehicleHealthStatus,
    VehiclePosition,
    Vehicles,
    VehicleSubscriptionPackages,
    VehicleTariffs,
    VehicleTrip,
    VehicleTrips,
    VehicleWakeupTime,
    RepeatSchedule
} from './ServiceTypes'


/**
 * Queries Vehicle Information
 */
export interface QueryVehicleInformationService {
    /**
     * Get country specific contact information based on the supplied Mobile Country Code (MCC).
     * Note that it does not show contact information for the specified country specifically,
     * but rather the contact information for a specified VIN given that you find yourself in
     * the given country.
     *
     * Meaning, if your vehicle was registered in Sweden, this request will still provide you
     * with the Swedish contact details even if you travel to Denmark.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param mcc Mobile Country Code
     */
    getContactInformation: (accessToken: string, deviceId: string, vin: string, mcc: string) => Promise<ContactInformation>

    /**
     * Get a service status.
     * 
     * Whenever a vehicle command is sent the server responds with a service status message. Any
     * given operation is identified by a specific service id, or `customerServiceId`. You can
     * use this id to check the operation status at any time to check whether it's currently
     * running, what the status is, etc.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getServiceStatus: (accessToken: string, deviceId: string, vin: string, customerServiceId: string) => Promise<ServiceStatus>

    /**
     * Get attributes for a specific vehicle (VIN).
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleAttributes: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleAttributes>

    /**
     * Get contact information associated with vehicle.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleContactInformation: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleContactInformation>

    /**
     * Get departure timers for specified vehicle.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleDepartureTimers: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleDepartureTimers>

    /**
     * Get the health status of the specified VIN. This requires you to pass a valid VHS auth
     * token.
     * 
     * This operation will effectively refresh the vehicle status. After the request is sent the
     * vehicle will be polled and the API data updated. The request will reply with a
     * `customerServiceId` that you can use to check the status of the service request. Once
     * it's successful the vehicle API data will have been successfully refreshed.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleHealthStatus: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleHealthStatus>

    /**
     * Get current position of vehicle. Will return lat, long, speed, heading and timestamp.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehiclePosition: (accessToken: string, deviceId: string, vin: string) => Promise<VehiclePosition>

    /**
     * Get the status for a specific vehicle (VIN)
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number 
     */
    getVehicleStatus: (accessToken: string, deviceId: string, vin: string) => Promise<CurrentVehicleStatus>

    /**
     * Version 3 of the vehicle status API request. The returned data is structured a bit
     * differently here with EV data compartmentalized nicely.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number 
     */
    getVehicleStatusV3: (accessToken: string, deviceId: string, vin: string) => Promise<CurrentVehicleResponseV3>

    /**
     * Get list of subscription packages for a specific VIN
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleSubscriptionPackages: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleSubscriptionPackages>

    /**
     * Retrieve Tariffs, also known as charging periods, associated with vehicle. The server
     * will return an empty `200 OK` response if not charging period exist.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleTariffs: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleTariffs>

    /**
     * Get data associated with a specific trip.
     * 
     * A valid vehicle trip id should be passed along with this request URI.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param tripId Trip ID
     */
    getVehicleTrip: (accessToken: string, deviceId: string, vin: string, tripId: string) => Promise<VehicleTrip>

    /**
     * Get the last 1,000 trips associated with the specified vehicle.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleTrips: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleTrips>

    /**
     * Get configured wakeup time for specified vehicle.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     */
    getVehicleWakeupTime: (accessToken: string, deviceId: string, vin: string) => Promise<VehicleWakeupTime>
}

/**
 * Queries User Information
 */
export interface QueryUserInformationService {
    /**
     * List user information based on the user ID.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param userId User Identifier
     */
    getUserInfoFromID: (accessToken: string, deviceId: string, userId: string) => Promise<UserInfo>
    
    /**
     * Lists the vehicles associated with the specified user id. It is unclear at this time what
     * the `primaryOnly` parameter does as all vehicles associated with the user id will be
     * returned regardless. It is possible that this parameter is simply not used for anything.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param userId User Identifier
     */
    getVehiclesForUser: (accessToken: string, deviceId: string, userId: string) => Promise<Vehicles>
}

/**
 * Sends Vehicle Commands
 */
export interface CommandVehicleService {
    /**
     * The vehicle will resume journey information logging.
     * 
     * This request requires a valid PROV service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number 
     * @param provToken PROV Token
     */
    disablePrivacySwitch: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * The vehicle will not log journey information as long as privacy mode is enabled. The API
     * seems to support specifying a start and stop time with this request but the mobile app
     * currently just passes `null` values along with the request so that the privacy mode is
     * enabled until the user disables it again.
     * 
     * This request requires a valid PROV service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param provToken PROV Token
     */
    enablePrivacySwitch: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * The vehicle will enter service mode which will allow the vehicle to be serviced without
     * InControl triggering a vehicle theft alarm.
     * 
     * This request requires a valid PROV service authentication token and a future time (in
     * epoch milliseconds) must be provided to specify when the service mode will be disabled
     * again. The mobile app always specifies a timestamp 10 hours in the future and it's not
     * clear whether this is an arbitrary value chosen for the app or if it's actually enforced
     * by the API.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number 
     * @param provToken PROV Token
     */
    enableServiceMode: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * The vehicle will enter service mode which will allow the vehicle to be transported on a
     * ferry, train, etc without InControl triggering a vehicle theft alarm.
     * 
     * This request requires a valid PROV service authentication token and a future time (in
     * epoch milliseconds) must be provided to specify when the transport mode will be disabled
     * again. The mobile app always specifies a timestamp 10 hours in the future and it's not
     * clear whether this is an arbitrary value chosen for the app or if it's actually enforced
     * by the API.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number 
     * @param provToken PROV Token.
     */
    enableTransportMode: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Honk the horn and flash the lights associated with the specified vehicle. Requires you to
     * pass a HBLF service auth token.
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param hblfToken HBLF Token
     */
    honkHorn: (accessToken: string, deviceId: string, vin: string, hblfToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Lock the vehicle remotely. Requires a valid RDL service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param rdlToken RDL Token
     */
    lockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Set the vehicle nick name and registration number.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param nickname Nickname
     * @param registrationNumber Registration Number
     */
    setVehicleNicknameAndRegistration: (accessToken: string, deviceId: string, vin: string, nickname: string, registrationNumber: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Reset the vehicle alarm. Requires a valid ALOFF service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param aloffToken ALOFF Token
     */
    stopAlarm: (accessToken: string, deviceId: string, vin: string, aloffToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Unlock the vehicle remotely. Requires a valid RDU service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param rdlToken RDL Token
     */
    unlockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string) => Promise<ServiceStatus | ServiceError>
}


/**
 * Sends Electric Vehicle-specific Commands
 */
export interface CommandElectricVehicleService {
    /**
     * Stop the climate preconditioning immediately.
     * 
     * This operation requires a valid ECC service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     */
    stopClimatePreconditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Start the climate preconditioning at the specified tempareture. Note the absense of the
     * decimal sign. 210 equals 21.0C.
     * 
     * For the LO setting you would pass 155 and for the HI setting you would pass 285.
     * 
     * This operation requires a valid ECC service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     */
    startClimatePrecdonditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Start charging the EV. Requires a valid cp service token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     */
    startCharging: (accessToken: string, deviceId: string, vin: string, eccToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Stop charging the EV. Requires a valid cp service token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     */
    stopCharging: (accessToken: string, deviceId: string, vin: string, eccToken: string) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Set the maximum state of charge. This requires a valid CP authentication token. The
     * vehicle will never charge more than the specified charge level (in percentage)
     * 
     * Note, this is not a feature the official mobile app exposes to the user.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param maxStateOfCharge Maximum State of Charge (0-100%)
     */
    setMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Set the one-off maximum state of charge. This requires a valid CP authentication token.
     * The vehicle will never charge more than the specified charge level (in percentage) for
     * the current charging session. Will presumably reset to whatever was the previous value
     * the next time the vehicle is connected to a charger.
     * 
     * Note, this is not a feature the official mobile app exposes to the user.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param maxStateOfCharge Maximum State of Charge (0-100%)
     */
    setOneOfMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, maxStateOfCharge: number) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Add a single departure timer for the specified vehicle. You need to pass a year, month,
     * day, hour and minute in order to specify the departure time. A valid CP service token is
     * required.
     * 
     * The departure timer is seemingly identifier by its numerical index value. A unique index
     * timer value must be specified when creating the departure timer.
     * 
     * Note that if you use an index value that already exist the old departure timer will be
     * overwritten with the new one.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param departureTime Departure Date and Time
     */
    addDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Add repeated departure timer for the specified vehicle. You need to pass a year, month,
     * day, hour and minute in order to specify the departure time. Additionally, you need to
     * specify which weekdays the departure timer should be active for. A valid CP service token
     * is required.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param departureTime Departure Time
     * @param repeatSchedule Departure Day Schedule
     */
    addRepeatedDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date, repeatSchedule: RepeatSchedule) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Delete departure timers specified by their index. Requires a valid CP service
     * authentication token.
     * 
     * You can list multiple departure timers to be deleted.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param timerIndex Index of the Timer to Delete
     */
    deleteDepartureTimers: (accessToken: string, deviceId: string, vin: string, cpToken: string, timerIndex: number) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Set a time period for charging. The vehicle will prioritize charging during the specified
     * period.
     * 
     * It's a bit unclear how this part of the API actually works. Specifying a charging period
     * from 01:00 to 08:30 results in three `TARIFF_ZONE` entries with different `bandType`
     * values and end times, 00:00, 01:00 and 08:30.
     * 
     * Requires a valid CP service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     */
    //addChargingPeriod: (accessToken: string, deviceId: string, vin: string, cpToken: string, chargingPeriod: ChargingPeriod) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Prioritize climate controls for either range or comfort.
     * 
     * You can pass either `PRIORITIZE_RANGE`or `PRIORITIZE_COMFORT` in the `serviceParameter`
     * value field to prioritize either range or comfort.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     * @param priority `PRIORITIZE_RANGE` or `PRIORITIZE_COMFORT`
     */
    setPriority: (accessToken: string, deviceId: string, vin: string, eccToken: string, priority: 'PRIORITIZE_RANGE' | 'PRIORITIZE_COMFORT') => Promise<ServiceStatus | ServiceError>
    
    /**
     * The vehicle will enter a sleep mode after four days of inactivity. In order to use remote
     * control features after this time a wake up timer is required.
     * 
     * By adding a wake up timer for a specific time before the vehicle enters sleep mode you
     * can ensure that the vehicle is available for remote control for a period of time after
     * the specified wake up time.
     * 
     * This request requires a valid swu service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param swuToken SWU Token
     * @param wakeupTime Wakeup Date and Time
     */
    addWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string, wakeupTime: Date) => Promise<ServiceStatus | ServiceError>
    
    /**
     * Cancel the wakeup timer.
     * 
     * This request requires a valid swu service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param swuToken SWU Token
     */
    stopWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string) => Promise<ServiceStatus | ServiceError>
}

/**
 * Miscellanous Services
 */
export interface MiscServices {
    getReverseGeocode: (accessToken: string, latitude: number, longitude: number) => Promise<ReverseGeocode>
}

/**
 * Jaguar Land Rover Remote Service
 */
export type JlrRemoteService = QueryVehicleInformationService
    & QueryUserInformationService
    & CommandVehicleService
    & CommandElectricVehicleService
    & MiscServices
