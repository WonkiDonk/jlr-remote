// This is an unofficial documentation of the JLR InControl Remote control API. The API has
// been reversed engineered and is in no way complete and is probably not entirely accurate.
// It's still work in progress and will change significantly. The API features the ability
// to retrieve information from the authenticated user and the associated vehicles as well
// as controlling various vehicle functions.
//
// The API uses multiple different base URLs and the different requests require various
// combinations of specific `Accept`and `Content-Type`header values as well as a plethora of
// different authentication tokens and pin values.

/**
 * auth
 *
 * POST https://ifas.prod-row.jlrmotor.com/ifas/jlr/tokens
 *
 * Initial user authentication requires you to pass your username (email address) and
 * password as well as specifying the appropriate grant type. The server will return with an
 * access token, authorization token, expiration timer, refresh token and a token type
 * indicator.
 *
 * The access token is used for the actual bearer authentication. It's unclear what the
 * purpose of the refresh token and authorization token is at this point but it must be
 * included in the body when registering a device.
 *
 * Note that the Basic auth password must be included. It's a hard coded value that
 * seemingly serves no real purpose other than to satisfy some arbitrary requirement.
 *
 * The access token must be included in all subsequent requests as the `Authorization`
 * bearer in the HTTP header.
 */
export interface Auth {
    access_token:        string;
    authorization_token: string;
    expires_in:          string;
    refresh_token:       string;
    token_type:          string;
}

/**
 * refresh token
 *
 * POST https://ifas.prod-row.jlrmotor.com/ifas/jlr/tokens
 *
 * Using a refresh token before the access token expiration it is possible to request new
 * tokens without having to submit username and password.
 *
 * Note that after refreshing the access token you will have to perform device registration
 * and user login again.
 */
export interface RefreshTokenResponse {
    access_token:        string;
    authorization_token: string;
    expires_in:          string;
    refresh_token:       string;
    token_type:          string;
}

/**
 * login user
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/users?loginName={{username}}
 *
 * After successful user authentication and device id registration, we need to log in the
 * user name and retrieve the user ID. The user ID is required for many vehicle related API
 * functions.
 *
 * The server will return user information upon a successful login request.
 */
export interface LoginUserResponse {
    contact:                 Contact;
    homeAddress:             HomeAddress;
    homeMarket:              string;
    userId:                  string;
    loginName:               string;
    userType:                null;
    nextOfKin:               null;
    pin:                     null;
    secureQuestion1:         null;
    secureQuestion2:         null;
    secureQuestion3:         null;
    secureAnswer1:           null;
    secureAnswer2:           null;
    secureAnswer3:           null;
    authCredentials:         null;
    marketingPrefsUpdatedAt: string;
    marketingOffersAccepted: boolean;
    vhsMessagesAccepted:     boolean;
}

export interface Contact {
    userPreferences: UserPreferences;
    firstName:       string;
    middleName:      null;
    lastName:        string;
    title:           string;
    gender:          null;
    birthday:        null;
    emailAddress:    string;
    homePhone:       null;
    businessPhone:   null;
    mobilePhone:     string;
}

export interface UserPreferences {
    timeZone:           string;
    unitsOfMeasurement: string;
    dateFormat:         string;
    language:           string;
}

export interface HomeAddress {
    street:        null;
    city:          string;
    zipCode:       string;
    stateProvince: string;
    country:       string;
    addressLine1:  string;
    addressLine2:  null;
}

/**
 * get vehicle attributes
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/attributes
 *
 * getting attributes for a specific vehicle (VIN)
 */
export interface VehicleAttributes {
    engineCode:                     string;
    seatsQuantity:                  number;
    exteriorColorName:              string;
    exteriorCode:                   string;
    interiorColorName:              null;
    interiorCode:                   null;
    tyreDimensionCode:              null;
    tyreInflationPressureLightCode: null;
    tyreInflationPressureHeavyCode: null;
    fuelType:                       string;
    fuelTankVolume:                 null;
    grossWeight:                    number;
    modelYear:                      number;
    constructionDate:               null;
    deliveryDate:                   null;
    numberOfDoors:                  number;
    country:                        string;
    registrationNumber:             string;
    carLocatorMapDistance:          null;
    vehicleBrand:                   string;
    vehicleType:                    string;
    vehicleTypeCode:                string;
    bodyType:                       string;
    gearboxCode:                    string;
    availableServices:              AvailableService[];
    timeFullyAccessible:            null;
    timePartiallyAccessible:        null;
    subscriptionType:               null;
    subscriptionStartDate:          null;
    subscriptionStopDate:           null;
    capabilities:                   Capability[];
    nickname:                       string;
    telematicsDevice:               TelematicsDevice;
    deviceState:                    string;
    roofType:                       string;
}

export interface AvailableService {
    serviceType:    string;
    vehicleCapable: boolean;
    serviceEnabled: boolean;
}

export interface Capability {
    capability:      string;
    capabilityClass: string;
}

export interface TelematicsDevice {
    serialNumber: string;
    imei:         null;
}

/**
 * get contact information
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/contactinfo/{{mcc}}
 *
 * Get country specific contact information based on the supplied Mobile Country Code (MCC).
 * Note that it does not show contact information for the specified country specifically,
 * but rather the contact information for a specified VIN given that you find yourself in
 * the given country.
 *
 * Meaning, if your vehicle was registered in Sweden, this request will still provide you
 * with the Swedish contact details even if you travel to Denmark.
 */
export interface ContactInformation {
    contactInfos: ContactInfo[];
}

export interface ContactInfo {
    key:   string;
    value: string;
    type:  string;
}

/**
 * get vehicle Tariffs
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/tariffs
 *
 * Retrieve Tariffs, also known as charging periods, associated with vehicle. The server
 * will return an empty `200 OK` response if not charging period exist.
 */
export interface VehicleTariffs {
    departureTimerSetting: null;
    tariffSettings:        TariffSettings;
    triggerUrl:            null;
    triggerUserId:         null;
    triggerPassword:       null;
    triggerMediaType:      null;
    startTime:             null;
    endTime:               null;
    serviceCommand:        null;
    serviceParameters:     null;
}

export interface TariffSettings {
    tariffs: Tariff[];
}

export interface Tariff {
    tariffIndex:      number;
    tariffDefinition: TariffDefinition;
}

export interface TariffDefinition {
    enabled:        boolean;
    repeatSchedule: RepeatSchedule;
    tariffZone:     TariffZone[];
}

export interface RepeatSchedule {
    monday:    boolean;
    tuesday:   boolean;
    wednesday: boolean;
    thursday:  boolean;
    friday:    boolean;
    saturday:  boolean;
    sunday:    boolean;
}

export interface TariffZone {
    zoneName: string;
    bandType: string;
    endTime:  Time;
}

export interface Time {
    hour:   number;
    minute: number;
}

/**
 * get vehicle contact information
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/contactinfo/310
 *
 * Get contact information associated with vehicle.
 */
export interface VehicleContactInformation {
    contactInfos: ContactInfo[];
}

/**
 * get vehicle subscription packages
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/subscriptionpackages
 *
 * Get list of subscription packages for a specific VIN
 */
export interface VehicleSubscriptionPackages {
    subscriptionPackages: SubscriptionPackage[];
}

export interface SubscriptionPackage {
    name:           string;
    status:         string;
    expirationDate: string;
}

/**
 * get vehicle status
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/status
 *
 * Get the status for a specific vehicle (VIN)
 */
export interface CurrentVehicleStatus {
    vehicleStatus:   VehicleStatus[];
    vehicleAlerts:   VehicleAlert[];
    lastUpdatedTime: string;
}

export interface VehicleAlert {
    key:             string;
    value:           string;
    active:          boolean;
    lastUpdatedTime: string;
}

export interface VehicleStatus {
    key:   string;
    value: null | string;
}

/**
 * get vehicle status v3
 *
 * GET
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/status?includeInactive=true
 *
 * Version 3 of the vehicle status API request. The returned data is structured a bit
 * differently here with EV data compartmentalized nicely.
 */
export interface CurrentVehicleStatusV3 {
    vehicleStatus:   GetVehicleStatusV3VehicleStatus;
    vehicleAlerts:   VehicleAlert[];
    lastUpdatedTime: string;
}

export interface GetVehicleStatusV3VehicleStatus {
    coreStatus: VehicleStatus[];
    evStatus:   VehicleStatus[];
}

/**
 * get service status
 *
 * GET
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/services/{{customer_service_id}}
 *
 * Whenever a vehicle command is sent the server responds with a service status message. Any
 * given operation is identified by a specific service id, or `customerServiceId`. You can
 * use this id to check the operation status at any time to check whether it's currently
 * running, what the status is, etc.
 */
export interface ServiceStatus {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  any[];
}

/**
 * get vehicle departure timers
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/departuretimers
 *
 * get departure timers for specified vehicle.
 */
export interface VehicleDepartureTimers {
    departureTimerSetting: DepartureTimerSetting;
    tariffSettings:        null;
    triggerUrl:            null;
    triggerUserId:         null;
    triggerPassword:       null;
    triggerMediaType:      null;
    startTime:             null;
    endTime:               null;
    serviceCommand:        null;
    serviceParameters:     null;
}

export interface DepartureTimerSetting {
    timers: Timer[];
}

export interface Timer {
    timerIndex:    number;
    timerType:     TimerType;
    departureTime: Time;
    timerTarget:   TimerTarget;
}

export interface TimerTarget {
    singleDay:      null;
    repeatSchedule: RepeatSchedule;
}

export interface TimerType {
    key:   string;
    value: boolean;
}

/**
 * get vehicle Wakeup time
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/wakeuptime
 *
 * Get configured wakeup time for specified vehicle.
 */
export interface VehicleWakeupTime {
    wakeupTime:     null;
    state:          string;
    scheduleWakeup: ScheduleWakeup;
}

export interface ScheduleWakeup {
    scheduleAcceptanceEnd: string;
    wakeupAcceptanceEnd:   string;
}

/**
 * get vehicle trips
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/trips?count=1000
 *
 * Get the last 1,000 trips associated with the specified vehicle.
 */
export interface VehicleTrips {
    trips: Trip[];
}

export interface Trip {
    id:           number;
    name:         null;
    category:     null;
    routeDetails: RouteDetails;
    tripDetails:  TripDetails;
}

export interface RouteDetails {
    route:          null;
    totalWaypoints: number;
    boundingBox:    BoundingBox;
}

export interface BoundingBox {
    minLongitude: number | null;
    minLatitude:  number | null;
    maxLongitude: number | null;
    maxLatitude:  number | null;
}

export interface TripDetails {
    electricalConsumption:  null;
    electricalRegeneration: null;
    fuelConsumption:        null;
    distance:               number;
    startOdometer:          number;
    startTime:              string;
    startPosition:          Position;
    endOdometer:            number;
    endTime:                string;
    endPosition:            Position;
    totalEcoScore:          EcoScore;
    throttleEcoScore:       EcoScore;
    speedEcoScore:          EcoScore;
    brakeEcoScore:          EcoScore;
    averageSpeed:           number;
    averageFuelConsumption: null;
}

export interface EcoScore {
    score:       number;
    scoreStatus: ScoreStatus;
}

export enum ScoreStatus {
    Valid = "VALID",
}

export interface Position {
    latitude:   number;
    longitude:  number;
    address:    string;
    postalCode: null | string;
    city:       null | string;
    region:     Region | null;
    country:    Country;
}

export enum Country {
    UnitedKingdom = "United Kingdom",
}

export enum Region {
    England = "England",
}

/**
 * get vehicle trip
 *
 * GET
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/trips/{{trip_id}}/route?pageSize=1000&page=0
 *
 * Get data associated with a specific trip.
 *
 * A valid vehicle trip id should be passed along with this request URI.
 */
export interface VehicleTrip {
    waypoints: Waypoint[];
}

export interface Waypoint {
    timestamp:              string;
    odometer:               number;
    fuelConsumption:        null;
    electricalConsumption:  null;
    electricalRegeneration: null;
    position:               WaypointPosition;
}

export interface WaypointPosition {
    latitude:  number;
    longitude: number;
    speed:     null;
    heading:   number;
}

/**
 * get vehicle position
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/position
 *
 * get current position of vehicle. Will return lat, long, speed, heading and timestamp.
 */
export interface VehiclePosition {
    position:           GetVehiclePositionPosition;
    calculatedPosition: null;
}

export interface GetVehiclePositionPosition {
    longitude:       number;
    latitude:        number;
    timestamp:       string;
    speed:           number;
    heading:         number;
    positionQuality: null;
}

/**
 * get vehicle health status
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/healthstatus
 *
 * Get the health status of the specified VIN. This requires you to pass a valid VHS auth
 * token.
 *
 * This operation will effectively refresh the vehicle status. After the request is sent the
 * vehicle will be polled and the API data updated. The request will reply with a
 * `customerServiceId` that you can use to check the status of the service request. Once
 * it's successful the vehicle API data will have been successfully refreshed.
 */
export interface VehicleHealthStatus {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  null;
}

/**
 * get user info from id
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/users/{{userid}}
 *
 * List user information based on the user ID.
 */
export interface UserInfo {
    contact:                 Contact;
    homeAddress:             HomeAddress;
    homeMarket:              string;
    userId:                  string;
    loginName:               string;
    userType:                null;
    nextOfKin:               null;
    pin:                     null;
    secureQuestion1:         null;
    secureQuestion2:         null;
    secureQuestion3:         null;
    secureAnswer1:           null;
    secureAnswer2:           null;
    secureAnswer3:           null;
    authCredentials:         null;
    marketingPrefsUpdatedAt: string;
    marketingOffersAccepted: boolean;
    vhsMessagesAccepted:     boolean;
}

/**
 * get vehicles for user id
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/users/{{userid}}/vehicles?primaryOnly=true
 *
 * Lists the vehicles associated with the specified user id. It is unclear at this time what
 * the `primaryOnly` parameter does as all vehicles associated with the user id will be
 * returned regardless. It is possible that this parameter is simply not used for anything.
 */
export interface Vehicles {
    vehicles: Vehicle[];
}

export interface Vehicle {
    userId: string;
    vin:    string;
    role:   string;
}

/**
 * honk horn
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/honkBlink
 *
 * Honk the horn and flash the lights associated with the specified vehicle. Requires you to
 * pass a HBLF service auth token.
 */
export interface HonkHorn {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  null;
}

/**
 * lock vehicle
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/lock
 *
 * Lock the vehicle remotely. Requires a valid RDL service authentication token.
 */
export interface LockVehicle {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
}

/**
 * unlock vehicle
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/unlock
 *
 * Unlock the vehicle remotely. Requires a valid RDU service authentication token.
 */
export interface UnlockVehicle {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
}

/**
 * stop alarm
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/alarmOff
 *
 * Reset the vehicle alarm. Requires a valid ALOFF service authentication token.
 */
export interface StopAlarm {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  null;
}

/**
 * start climate preconditioning
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/preconditioning
 *
 * Start the climate preconditioning at the specified tempareture. Note the absense of the
 * decimal sign. 210 equals 21.0C.
 *
 * For the LO setting you would pass 155 and for the HI setting you would pass 285.
 *
 * This operation requires a valid ECC service authentication token.
 */
export interface StartClimatePreconditioning {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * stop climate preconditioning
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/preconditioning
 *
 * Stop the climate preconditioning immediately.
 *
 * This operation requires a valid ECC service authentication token.
 */
export interface StopClimatePreconditioning {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * start charging
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Start charging the EV. Requires a valid cp service token.
 */
export interface StartCharging {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * stop charging
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Stop charging the EV. Requires a valid cp service token.
 */
export interface ServiceError {
    errorLabel:       string;
    errorDescription: string;
}

/**
 * set max state of charge
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Set the maximum state of charge. This requires a valid CP authentication token. The
 * vehicle will never charge more than the specified charge level (in percentage)
 *
 * Note, this is not a feature the official mobile app exposes to the user.
 */
export interface SetMaxStateOfCharge {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * set one-off max state of charge
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Set the one-off maximum state of charge. This requires a valid CP authentication token.
 * The vehicle will never charge more than the specified charge level (in percentage) for
 * the current charging session. Will presumably reset to whatever was the previous value
 * the next time the vehicle is connected to a charger.
 *
 * Note, this is not a feature the official mobile app exposes to the user.
 */
export interface SetOneOffMaxStateOfCharge {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * add departure timer
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Add a single departure timer for the specified vehicle. You need to pass a year, month,
 * day, hour and minute in order to specify the departure time. A valid CP service token is
 * required.
 *
 * The departure timer is seemingly identifier by its numerical index value. A unique index
 * timer value must be specified when creating the departure timer.
 *
 * Note that if you use an index value that already exist the old departure timer will be
 * overwritten with the new one.
 */
export interface AddDepartureTimer {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * add repeated departure timer
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Add repeated departure timer for the specified vehicle. You need to pass a year, month,
 * day, hour and minute in order to specify the departure time. Additionally, you need to
 * specify which weekdays the departure timer should be active for. A valid CP service token
 * is required.
 */
export interface AddRepeatedDepartureTimer {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * delete departure timers
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Delete departure timers specified by their index. Requires a valid CP service
 * authentication token.
 *
 * You can list multiple departure timers to be deleted.
 */
export interface DeleteDepartureTimers {
    errorLabel:       string;
    errorDescription: string;
}

/**
 * add charging period
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/chargeProfile
 *
 * Set a time period for charging. The vehicle will prioritize charging during the specified
 * period.
 *
 * It's a bit unclear how this part of the API actually works. Specifying a charging period
 * from 01:00 to 08:30 results in three `TARIFF_ZONE` entries with different `bandType`
 * values and end times, 00:00, 01:00 and 08:30.
 *
 * Requires a valid CP service auth token.
 */
export interface AddChargingPeriod {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * prioritize climate
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/preconditioning
 *
 * Prioritize climate controls for either range or comfort.
 *
 * You can pass either `PRIORITIZE_RANGE`or `PRIORITIZE_COMFORT` in the `serviceParameter`
 * value field to prioritize either range or comfort.
 */
export interface PrioritizeClimate {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  VehicleStatus[];
}

/**
 * add wake up time
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/swu
 *
 * The vehicle will enter a sleep mode after four days of inactivity. In order to use remote
 * control features after this time a wake up timer is required.
 *
 * By adding a wake up timer for a specific time before the vehicle enters sleep mode you
 * can ensure that the vehicle is available for remote control for a period of time after
 * the specified wake up time.
 *
 * This request requires a valid swu service auth token.
 */
export interface AddWakeUpTime {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
}

/**
 * stop wake up time
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/swu
 *
 * Cancel the wakeup timer.
 *
 * This request requires a valid swu service auth token.
 */
export interface StopWakeUpTime {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
}

/**
 * enable service mode
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/prov
 *
 * The vehicle will enter service mode which will allow the vehicle to be serviced without
 * InControl triggering a vehicle theft alarm.
 *
 * This request requires a valid PROV service authentication token and a future time (in
 * epoch milliseconds) must be provided to specify when the service mode will be disabled
 * again. The mobile app always specifies a timestamp 10 hours in the future and it's not
 * clear whether this is an arbitrary value chosen for the app or if it's actually enforced
 * by the API.
 */
export interface EnableServiceMode {
    status:             string;
    statusTimestamp:    string;
    startTime:          string;
    serviceType:        string;
    failureDescription: string;
    customerServiceId:  string;
    vehicleId:          string;
    active:             boolean;
    initiator:          string;
    eventTrigger:       null;
    serviceCommand:     null;
    serviceParameters:  null;
}

/**
 * enable transport mode
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/prov
 *
 * The vehicle will enter service mode which will allow the vehicle to be transported on a
 * ferry, train, etc without InControl triggering a vehicle theft alarm.
 *
 * This request requires a valid PROV service authentication token and a future time (in
 * epoch milliseconds) must be provided to specify when the transport mode will be disabled
 * again. The mobile app always specifies a timestamp 10 hours in the future and it's not
 * clear whether this is an arbitrary value chosen for the app or if it's actually enforced
 * by the API.
 */
export interface EnableTransportMode {
    errorLabel:       string;
    errorDescription: string;
}

/**
 * enable privacy switch
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/prov
 *
 * The vehicle will not log journey information as long as privacy mode is enabled. The API
 * seems to support specifying a start and stop time with this request but the mobile app
 * currently just passes `null` values along with the request so that the privacy mode is
 * enabled until the user disables it again.
 *
 * This request requires a valid PROV service authentication token.
 */
export interface EnablePrivacySwitch {
    errorLabel:       string;
    errorDescription: string;
}

/**
 * disable privacy switch
 *
 * POST https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/prov
 *
 * The vehicle will resume journey information logging.
 *
 * This request requires a valid PROV service authentication token.
 */
export interface DisablePrivacySwitch {
    errorLabel:       string;
    errorDescription: string;
}

/**
 * authenticate VHS
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the VHS service and obtain the VHS authorization token. This is required
 * for certain vehicle related operations. Retrieving vehicle health status is one example
 * of such an operation.
 *
 * To authenticate to the service you nede to pass an empty pin value.
 */
export interface AuthenticateVHS {
    token: string;
}

/**
 * authenticate HBLF
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the HBLF service. This requires the client to pass a PIN which is the
 * last four digits in the vehicle VIN. I'm assuming HBLF stands for HonkBlink Something
 * something and you need the token returned from this authentication operation to send the
 * honkblink command.
 *
 * In order to authenticate to the service, the last four digits of the vehicle VIN number
 * need to be supplied in the body.
 */
export interface AuthenticateHBLF {
    token: string;
}

/**
 * authenticate ECC
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the ECC service. This requires the client to pass a PIN which can be any
 * arbitrary value, including an empty one. However, the mobile app passes the last four
 * digits in the vehicle VIN. The ECC service authentication is required for climate
 * preconditoning controls.
 */
export interface AuthenticateECC {
    token: string;
}

/**
 * authenticate CP
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the CP service. This requires the client to pass a PIN which is the last
 * four digits in the vehicle VIN. The CP service authentication is required for charging
 * profile related operations.
 */
export interface AuthenticateCP {
    token: string;
}

/**
 * authenticate RDL
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the RDL service. This requires the client to pass the user's personal
 * PIN. The RDL service is used for remotely locking the vehicle.
 */
export interface AuthenticateRDL {
    token: string;
}

/**
 * authenticate RDU
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the RDU service. This requires the client to pass the user's personal
 * PIN. The RDU service is used for remotely unlocking the vehicle.
 */
export interface AuthenticateRDU {
    token: string;
}

/**
 * authenticate ALOFF
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the ALOFF service. This requires the client to pass the user's personal
 * PIN. The ALOFF service is used for remotely resetting the vehicle alarm.
 */
export interface AuthenticateALOFF {
    token: string;
}

/**
 * authenticate PROV
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the PROV service. This requires the client to pass the user's personal
 * PIN. This service is used for enabling and disabling service mode.
 */
export interface AuthenticatePROV {
    token: string;
}

/**
 * authenticate SWU
 *
 * POST
 * https://if9.prod-row.jlrmotor.com/if9/jlr/vehicles/{{vin}}/users/{{userid}}/authenticate
 *
 * Authenticate to the SWU service. This requires the client to pass an empty PIN value. The
 * SWU service is used for setting wake up timers.
 */
export interface AuthenticateSWU {
    token: string;
}

/**
 * app version check
 *
 * POST https://incontrol.jaguar.com/jaguar-portal-owner-web/app-version-check/compare
 *
 * Some sort of validation of mobile app version. Returns an `state`value indicating whether
 * app version is supported.
 */
export interface AppVersionCheck {
    state: string;
}

/**
 * reverse geocode
 *
 * GET https://if9.prod-row.jlrmotor.com/if9/jlr/geocode/reverse/{{lat}}/{{lon}}/en
 *
 * Lookup a lat/long combination and get address information associated with the supplied
 * coordinates.
 */
export interface ReverseGeocode {
    formattedAddress:  string;
    street:            string;
    streetNumber:      string;
    postalcode:        string;
    city:              null;
    citycode:          null;
    region:            string;
    regionCode:        null;
    country:           string;
    countryCodeISO2:   string;
    province:          string;
    district:          null;
    telephoneAreaCode: null;
    additionalInfo:    null;
    provinceAdcode:    null;
    cityAdcode:        null;
    districtAdcode:    null;
    adcode:            null;
    any:               null;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAuth(json: string): Auth {
        return cast(JSON.parse(json), r("Auth"));
    }

    public static authToJson(value: Auth): string {
        return JSON.stringify(uncast(value, r("Auth")), null, 2);
    }

    public static toRefreshToken(json: string): RefreshTokenResponse {
        return cast(JSON.parse(json), r("RefreshToken"));
    }

    public static refreshTokenToJson(value: RefreshTokenResponse): string {
        return JSON.stringify(uncast(value, r("RefreshToken")), null, 2);
    }

    public static toLoginUser(json: string): LoginUserResponse {
        return cast(JSON.parse(json), r("LoginUser"));
    }

    public static loginUserToJson(value: LoginUserResponse): string {
        return JSON.stringify(uncast(value, r("LoginUser")), null, 2);
    }

    public static toGetVehicleAttributes(json: string): VehicleAttributes {
        return cast(JSON.parse(json), r("GetVehicleAttributes"));
    }

    public static getVehicleAttributesToJson(value: VehicleAttributes): string {
        return JSON.stringify(uncast(value, r("GetVehicleAttributes")), null, 2);
    }

    public static toGetContactInformation(json: string): ContactInformation {
        return cast(JSON.parse(json), r("GetContactInformation"));
    }

    public static getContactInformationToJson(value: ContactInformation): string {
        return JSON.stringify(uncast(value, r("GetContactInformation")), null, 2);
    }

    public static toGetVehicleTariffs(json: string): VehicleTariffs {
        return cast(JSON.parse(json), r("GetVehicleTariffs"));
    }

    public static getVehicleTariffsToJson(value: VehicleTariffs): string {
        return JSON.stringify(uncast(value, r("GetVehicleTariffs")), null, 2);
    }

    public static toGetVehicleContactInformation(json: string): VehicleContactInformation {
        return cast(JSON.parse(json), r("GetVehicleContactInformation"));
    }

    public static getVehicleContactInformationToJson(value: VehicleContactInformation): string {
        return JSON.stringify(uncast(value, r("GetVehicleContactInformation")), null, 2);
    }

    public static toGetVehicleSubscriptionPackages(json: string): VehicleSubscriptionPackages {
        return cast(JSON.parse(json), r("GetVehicleSubscriptionPackages"));
    }

    public static getVehicleSubscriptionPackagesToJson(value: VehicleSubscriptionPackages): string {
        return JSON.stringify(uncast(value, r("GetVehicleSubscriptionPackages")), null, 2);
    }

    public static toGetVehicleStatus(json: string): CurrentVehicleStatus {
        return cast(JSON.parse(json), r("GetVehicleStatus"));
    }

    public static getVehicleStatusToJson(value: CurrentVehicleStatus): string {
        return JSON.stringify(uncast(value, r("GetVehicleStatus")), null, 2);
    }

    public static toGetVehicleStatusV3(json: string): CurrentVehicleStatusV3 {
        return cast(JSON.parse(json), r("GetVehicleStatusV3"));
    }

    public static getVehicleStatusV3ToJson(value: CurrentVehicleStatusV3): string {
        return JSON.stringify(uncast(value, r("GetVehicleStatusV3")), null, 2);
    }

    public static toGetServiceStatus(json: string): ServiceStatus {
        return cast(JSON.parse(json), r("GetServiceStatus"));
    }

    public static getServiceStatusToJson(value: ServiceStatus): string {
        return JSON.stringify(uncast(value, r("GetServiceStatus")), null, 2);
    }

    public static toGetVehicleDepartureTimers(json: string): VehicleDepartureTimers {
        return cast(JSON.parse(json), r("GetVehicleDepartureTimers"));
    }

    public static getVehicleDepartureTimersToJson(value: VehicleDepartureTimers): string {
        return JSON.stringify(uncast(value, r("GetVehicleDepartureTimers")), null, 2);
    }

    public static toGetVehicleWakeupTime(json: string): VehicleWakeupTime {
        return cast(JSON.parse(json), r("GetVehicleWakeupTime"));
    }

    public static getVehicleWakeupTimeToJson(value: VehicleWakeupTime): string {
        return JSON.stringify(uncast(value, r("GetVehicleWakeupTime")), null, 2);
    }

    public static toGetVehicleTrips(json: string): VehicleTrips {
        return cast(JSON.parse(json), r("GetVehicleTrips"));
    }

    public static getVehicleTripsToJson(value: VehicleTrips): string {
        return JSON.stringify(uncast(value, r("GetVehicleTrips")), null, 2);
    }

    public static toGetVehicleTrip(json: string): VehicleTrip {
        return cast(JSON.parse(json), r("GetVehicleTrip"));
    }

    public static getVehicleTripToJson(value: VehicleTrip): string {
        return JSON.stringify(uncast(value, r("GetVehicleTrip")), null, 2);
    }

    public static toGetVehiclePosition(json: string): VehiclePosition {
        return cast(JSON.parse(json), r("GetVehiclePosition"));
    }

    public static getVehiclePositionToJson(value: VehiclePosition): string {
        return JSON.stringify(uncast(value, r("GetVehiclePosition")), null, 2);
    }

    public static toGetVehicleHealthStatus(json: string): VehicleHealthStatus {
        return cast(JSON.parse(json), r("GetVehicleHealthStatus"));
    }

    public static getVehicleHealthStatusToJson(value: VehicleHealthStatus): string {
        return JSON.stringify(uncast(value, r("GetVehicleHealthStatus")), null, 2);
    }

    public static toGetUserInfoFromID(json: string): UserInfo {
        return cast(JSON.parse(json), r("GetUserInfoFromID"));
    }

    public static getUserInfoFromIDToJson(value: UserInfo): string {
        return JSON.stringify(uncast(value, r("GetUserInfoFromID")), null, 2);
    }

    public static toGetVehiclesForUserID(json: string): Vehicles {
        return cast(JSON.parse(json), r("GetVehiclesForUserID"));
    }

    public static getVehiclesForUserIDToJson(value: Vehicles): string {
        return JSON.stringify(uncast(value, r("GetVehiclesForUserID")), null, 2);
    }

    public static toHonkHorn(json: string): HonkHorn {
        return cast(JSON.parse(json), r("HonkHorn"));
    }

    public static honkHornToJson(value: HonkHorn): string {
        return JSON.stringify(uncast(value, r("HonkHorn")), null, 2);
    }

    public static toLockVehicle(json: string): LockVehicle {
        return cast(JSON.parse(json), r("LockVehicle"));
    }

    public static lockVehicleToJson(value: LockVehicle): string {
        return JSON.stringify(uncast(value, r("LockVehicle")), null, 2);
    }

    public static toUnlockVehicle(json: string): UnlockVehicle {
        return cast(JSON.parse(json), r("UnlockVehicle"));
    }

    public static unlockVehicleToJson(value: UnlockVehicle): string {
        return JSON.stringify(uncast(value, r("UnlockVehicle")), null, 2);
    }

    public static toStopAlarm(json: string): StopAlarm {
        return cast(JSON.parse(json), r("StopAlarm"));
    }

    public static stopAlarmToJson(value: StopAlarm): string {
        return JSON.stringify(uncast(value, r("StopAlarm")), null, 2);
    }

    public static toStartClimatePreconditioning(json: string): StartClimatePreconditioning {
        return cast(JSON.parse(json), r("StartClimatePreconditioning"));
    }

    public static startClimatePreconditioningToJson(value: StartClimatePreconditioning): string {
        return JSON.stringify(uncast(value, r("StartClimatePreconditioning")), null, 2);
    }

    public static toStopClimatePreconditioning(json: string): StopClimatePreconditioning {
        return cast(JSON.parse(json), r("StopClimatePreconditioning"));
    }

    public static stopClimatePreconditioningToJson(value: StopClimatePreconditioning): string {
        return JSON.stringify(uncast(value, r("StopClimatePreconditioning")), null, 2);
    }

    public static toStartCharging(json: string): StartCharging {
        return cast(JSON.parse(json), r("StartCharging"));
    }

    public static startChargingToJson(value: StartCharging): string {
        return JSON.stringify(uncast(value, r("StartCharging")), null, 2);
    }

    public static toStopCharging(json: string): ServiceError {
        return cast(JSON.parse(json), r("StopCharging"));
    }

    public static stopChargingToJson(value: ServiceError): string {
        return JSON.stringify(uncast(value, r("StopCharging")), null, 2);
    }

    public static toSetMaxStateOfCharge(json: string): SetMaxStateOfCharge {
        return cast(JSON.parse(json), r("SetMaxStateOfCharge"));
    }

    public static setMaxStateOfChargeToJson(value: SetMaxStateOfCharge): string {
        return JSON.stringify(uncast(value, r("SetMaxStateOfCharge")), null, 2);
    }

    public static toSetOneOffMaxStateOfCharge(json: string): SetOneOffMaxStateOfCharge {
        return cast(JSON.parse(json), r("SetOneOffMaxStateOfCharge"));
    }

    public static setOneOffMaxStateOfChargeToJson(value: SetOneOffMaxStateOfCharge): string {
        return JSON.stringify(uncast(value, r("SetOneOffMaxStateOfCharge")), null, 2);
    }

    public static toAddDepartureTimer(json: string): AddDepartureTimer {
        return cast(JSON.parse(json), r("AddDepartureTimer"));
    }

    public static addDepartureTimerToJson(value: AddDepartureTimer): string {
        return JSON.stringify(uncast(value, r("AddDepartureTimer")), null, 2);
    }

    public static toAddRepeatedDepartureTimer(json: string): AddRepeatedDepartureTimer {
        return cast(JSON.parse(json), r("AddRepeatedDepartureTimer"));
    }

    public static addRepeatedDepartureTimerToJson(value: AddRepeatedDepartureTimer): string {
        return JSON.stringify(uncast(value, r("AddRepeatedDepartureTimer")), null, 2);
    }

    public static toDeleteDepartureTimers(json: string): DeleteDepartureTimers {
        return cast(JSON.parse(json), r("DeleteDepartureTimers"));
    }

    public static deleteDepartureTimersToJson(value: DeleteDepartureTimers): string {
        return JSON.stringify(uncast(value, r("DeleteDepartureTimers")), null, 2);
    }

    public static toAddChargingPeriod(json: string): AddChargingPeriod {
        return cast(JSON.parse(json), r("AddChargingPeriod"));
    }

    public static addChargingPeriodToJson(value: AddChargingPeriod): string {
        return JSON.stringify(uncast(value, r("AddChargingPeriod")), null, 2);
    }

    public static toPrioritizeClimate(json: string): PrioritizeClimate {
        return cast(JSON.parse(json), r("PrioritizeClimate"));
    }

    public static prioritizeClimateToJson(value: PrioritizeClimate): string {
        return JSON.stringify(uncast(value, r("PrioritizeClimate")), null, 2);
    }

    public static toAddWakeUpTime(json: string): AddWakeUpTime {
        return cast(JSON.parse(json), r("AddWakeUpTime"));
    }

    public static addWakeUpTimeToJson(value: AddWakeUpTime): string {
        return JSON.stringify(uncast(value, r("AddWakeUpTime")), null, 2);
    }

    public static toStopWakeUpTime(json: string): StopWakeUpTime {
        return cast(JSON.parse(json), r("StopWakeUpTime"));
    }

    public static stopWakeUpTimeToJson(value: StopWakeUpTime): string {
        return JSON.stringify(uncast(value, r("StopWakeUpTime")), null, 2);
    }

    public static toEnableServiceMode(json: string): EnableServiceMode {
        return cast(JSON.parse(json), r("EnableServiceMode"));
    }

    public static enableServiceModeToJson(value: EnableServiceMode): string {
        return JSON.stringify(uncast(value, r("EnableServiceMode")), null, 2);
    }

    public static toEnableTransportMode(json: string): EnableTransportMode {
        return cast(JSON.parse(json), r("EnableTransportMode"));
    }

    public static enableTransportModeToJson(value: EnableTransportMode): string {
        return JSON.stringify(uncast(value, r("EnableTransportMode")), null, 2);
    }

    public static toEnablePrivacySwitch(json: string): EnablePrivacySwitch {
        return cast(JSON.parse(json), r("EnablePrivacySwitch"));
    }

    public static enablePrivacySwitchToJson(value: EnablePrivacySwitch): string {
        return JSON.stringify(uncast(value, r("EnablePrivacySwitch")), null, 2);
    }

    public static toDisablePrivacySwitch(json: string): DisablePrivacySwitch {
        return cast(JSON.parse(json), r("DisablePrivacySwitch"));
    }

    public static disablePrivacySwitchToJson(value: DisablePrivacySwitch): string {
        return JSON.stringify(uncast(value, r("DisablePrivacySwitch")), null, 2);
    }

    public static toAuthenticateVHS(json: string): AuthenticateVHS {
        return cast(JSON.parse(json), r("AuthenticateVHS"));
    }

    public static authenticateVHSToJson(value: AuthenticateVHS): string {
        return JSON.stringify(uncast(value, r("AuthenticateVHS")), null, 2);
    }

    public static toAuthenticateHBLF(json: string): AuthenticateHBLF {
        return cast(JSON.parse(json), r("AuthenticateHBLF"));
    }

    public static authenticateHBLFToJson(value: AuthenticateHBLF): string {
        return JSON.stringify(uncast(value, r("AuthenticateHBLF")), null, 2);
    }

    public static toAuthenticateECC(json: string): AuthenticateECC {
        return cast(JSON.parse(json), r("AuthenticateECC"));
    }

    public static authenticateECCToJson(value: AuthenticateECC): string {
        return JSON.stringify(uncast(value, r("AuthenticateECC")), null, 2);
    }

    public static toAuthenticateCP(json: string): AuthenticateCP {
        return cast(JSON.parse(json), r("AuthenticateCP"));
    }

    public static authenticateCPToJson(value: AuthenticateCP): string {
        return JSON.stringify(uncast(value, r("AuthenticateCP")), null, 2);
    }

    public static toAuthenticateRDL(json: string): AuthenticateRDL {
        return cast(JSON.parse(json), r("AuthenticateRDL"));
    }

    public static authenticateRDLToJson(value: AuthenticateRDL): string {
        return JSON.stringify(uncast(value, r("AuthenticateRDL")), null, 2);
    }

    public static toAuthenticateRDU(json: string): AuthenticateRDU {
        return cast(JSON.parse(json), r("AuthenticateRDU"));
    }

    public static authenticateRDUToJson(value: AuthenticateRDU): string {
        return JSON.stringify(uncast(value, r("AuthenticateRDU")), null, 2);
    }

    public static toAuthenticateALOFF(json: string): AuthenticateALOFF {
        return cast(JSON.parse(json), r("AuthenticateALOFF"));
    }

    public static authenticateALOFFToJson(value: AuthenticateALOFF): string {
        return JSON.stringify(uncast(value, r("AuthenticateALOFF")), null, 2);
    }

    public static toAuthenticatePROV(json: string): AuthenticatePROV {
        return cast(JSON.parse(json), r("AuthenticatePROV"));
    }

    public static authenticatePROVToJson(value: AuthenticatePROV): string {
        return JSON.stringify(uncast(value, r("AuthenticatePROV")), null, 2);
    }

    public static toAuthenticateSWU(json: string): AuthenticateSWU {
        return cast(JSON.parse(json), r("AuthenticateSWU"));
    }

    public static authenticateSWUToJson(value: AuthenticateSWU): string {
        return JSON.stringify(uncast(value, r("AuthenticateSWU")), null, 2);
    }

    public static toAppVersionCheck(json: string): AppVersionCheck {
        return cast(JSON.parse(json), r("AppVersionCheck"));
    }

    public static appVersionCheckToJson(value: AppVersionCheck): string {
        return JSON.stringify(uncast(value, r("AppVersionCheck")), null, 2);
    }

    public static toReverseGeocode(json: string): ReverseGeocode {
        return cast(JSON.parse(json), r("ReverseGeocode"));
    }

    public static reverseGeocodeToJson(value: ReverseGeocode): string {
        return JSON.stringify(uncast(value, r("ReverseGeocode")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Auth": o([
        { json: "access_token", js: "access_token", typ: "" },
        { json: "authorization_token", js: "authorization_token", typ: "" },
        { json: "expires_in", js: "expires_in", typ: "" },
        { json: "refresh_token", js: "refresh_token", typ: "" },
        { json: "token_type", js: "token_type", typ: "" },
    ], false),
    "RefreshToken": o([
        { json: "access_token", js: "access_token", typ: "" },
        { json: "authorization_token", js: "authorization_token", typ: "" },
        { json: "expires_in", js: "expires_in", typ: "" },
        { json: "refresh_token", js: "refresh_token", typ: "" },
        { json: "token_type", js: "token_type", typ: "" },
    ], false),
    "LoginUser": o([
        { json: "contact", js: "contact", typ: r("Contact") },
        { json: "homeAddress", js: "homeAddress", typ: r("HomeAddress") },
        { json: "homeMarket", js: "homeMarket", typ: "" },
        { json: "userId", js: "userId", typ: "" },
        { json: "loginName", js: "loginName", typ: "" },
        { json: "userType", js: "userType", typ: null },
        { json: "nextOfKin", js: "nextOfKin", typ: null },
        { json: "pin", js: "pin", typ: null },
        { json: "secureQuestion1", js: "secureQuestion1", typ: null },
        { json: "secureQuestion2", js: "secureQuestion2", typ: null },
        { json: "secureQuestion3", js: "secureQuestion3", typ: null },
        { json: "secureAnswer1", js: "secureAnswer1", typ: null },
        { json: "secureAnswer2", js: "secureAnswer2", typ: null },
        { json: "secureAnswer3", js: "secureAnswer3", typ: null },
        { json: "authCredentials", js: "authCredentials", typ: null },
        { json: "marketingPrefsUpdatedAt", js: "marketingPrefsUpdatedAt", typ: "" },
        { json: "marketingOffersAccepted", js: "marketingOffersAccepted", typ: true },
        { json: "vhsMessagesAccepted", js: "vhsMessagesAccepted", typ: true },
    ], false),
    "Contact": o([
        { json: "userPreferences", js: "userPreferences", typ: r("UserPreferences") },
        { json: "firstName", js: "firstName", typ: "" },
        { json: "middleName", js: "middleName", typ: null },
        { json: "lastName", js: "lastName", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "gender", js: "gender", typ: null },
        { json: "birthday", js: "birthday", typ: null },
        { json: "emailAddress", js: "emailAddress", typ: "" },
        { json: "homePhone", js: "homePhone", typ: null },
        { json: "businessPhone", js: "businessPhone", typ: null },
        { json: "mobilePhone", js: "mobilePhone", typ: "" },
    ], false),
    "UserPreferences": o([
        { json: "timeZone", js: "timeZone", typ: "" },
        { json: "unitsOfMeasurement", js: "unitsOfMeasurement", typ: "" },
        { json: "dateFormat", js: "dateFormat", typ: "" },
        { json: "language", js: "language", typ: "" },
    ], false),
    "HomeAddress": o([
        { json: "street", js: "street", typ: null },
        { json: "city", js: "city", typ: "" },
        { json: "zipCode", js: "zipCode", typ: "" },
        { json: "stateProvince", js: "stateProvince", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "addressLine1", js: "addressLine1", typ: "" },
        { json: "addressLine2", js: "addressLine2", typ: null },
    ], false),
    "GetVehicleAttributes": o([
        { json: "engineCode", js: "engineCode", typ: "" },
        { json: "seatsQuantity", js: "seatsQuantity", typ: 0 },
        { json: "exteriorColorName", js: "exteriorColorName", typ: "" },
        { json: "exteriorCode", js: "exteriorCode", typ: "" },
        { json: "interiorColorName", js: "interiorColorName", typ: null },
        { json: "interiorCode", js: "interiorCode", typ: null },
        { json: "tyreDimensionCode", js: "tyreDimensionCode", typ: null },
        { json: "tyreInflationPressureLightCode", js: "tyreInflationPressureLightCode", typ: null },
        { json: "tyreInflationPressureHeavyCode", js: "tyreInflationPressureHeavyCode", typ: null },
        { json: "fuelType", js: "fuelType", typ: "" },
        { json: "fuelTankVolume", js: "fuelTankVolume", typ: null },
        { json: "grossWeight", js: "grossWeight", typ: 0 },
        { json: "modelYear", js: "modelYear", typ: 0 },
        { json: "constructionDate", js: "constructionDate", typ: null },
        { json: "deliveryDate", js: "deliveryDate", typ: null },
        { json: "numberOfDoors", js: "numberOfDoors", typ: 0 },
        { json: "country", js: "country", typ: "" },
        { json: "registrationNumber", js: "registrationNumber", typ: "" },
        { json: "carLocatorMapDistance", js: "carLocatorMapDistance", typ: null },
        { json: "vehicleBrand", js: "vehicleBrand", typ: "" },
        { json: "vehicleType", js: "vehicleType", typ: "" },
        { json: "vehicleTypeCode", js: "vehicleTypeCode", typ: "" },
        { json: "bodyType", js: "bodyType", typ: "" },
        { json: "gearboxCode", js: "gearboxCode", typ: "" },
        { json: "availableServices", js: "availableServices", typ: a(r("AvailableService")) },
        { json: "timeFullyAccessible", js: "timeFullyAccessible", typ: null },
        { json: "timePartiallyAccessible", js: "timePartiallyAccessible", typ: null },
        { json: "subscriptionType", js: "subscriptionType", typ: null },
        { json: "subscriptionStartDate", js: "subscriptionStartDate", typ: null },
        { json: "subscriptionStopDate", js: "subscriptionStopDate", typ: null },
        { json: "capabilities", js: "capabilities", typ: a(r("Capability")) },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "telematicsDevice", js: "telematicsDevice", typ: r("TelematicsDevice") },
        { json: "deviceState", js: "deviceState", typ: "" },
        { json: "roofType", js: "roofType", typ: "" },
    ], false),
    "AvailableService": o([
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "vehicleCapable", js: "vehicleCapable", typ: true },
        { json: "serviceEnabled", js: "serviceEnabled", typ: true },
    ], false),
    "Capability": o([
        { json: "capability", js: "capability", typ: "" },
        { json: "capabilityClass", js: "capabilityClass", typ: "" },
    ], false),
    "TelematicsDevice": o([
        { json: "serialNumber", js: "serialNumber", typ: "" },
        { json: "imei", js: "imei", typ: null },
    ], false),
    "GetContactInformation": o([
        { json: "contactInfos", js: "contactInfos", typ: a(r("ContactInfo")) },
    ], false),
    "ContactInfo": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: "" },
        { json: "type", js: "type", typ: "" },
    ], false),
    "GetVehicleTariffs": o([
        { json: "departureTimerSetting", js: "departureTimerSetting", typ: null },
        { json: "tariffSettings", js: "tariffSettings", typ: r("TariffSettings") },
        { json: "triggerUrl", js: "triggerUrl", typ: null },
        { json: "triggerUserId", js: "triggerUserId", typ: null },
        { json: "triggerPassword", js: "triggerPassword", typ: null },
        { json: "triggerMediaType", js: "triggerMediaType", typ: null },
        { json: "startTime", js: "startTime", typ: null },
        { json: "endTime", js: "endTime", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "TariffSettings": o([
        { json: "tariffs", js: "tariffs", typ: a(r("Tariff")) },
    ], false),
    "Tariff": o([
        { json: "tariffIndex", js: "tariffIndex", typ: 0 },
        { json: "tariffDefinition", js: "tariffDefinition", typ: r("TariffDefinition") },
    ], false),
    "TariffDefinition": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "repeatSchedule", js: "repeatSchedule", typ: r("RepeatSchedule") },
        { json: "tariffZone", js: "tariffZone", typ: a(r("TariffZone")) },
    ], false),
    "RepeatSchedule": o([
        { json: "monday", js: "monday", typ: true },
        { json: "tuesday", js: "tuesday", typ: true },
        { json: "wednesday", js: "wednesday", typ: true },
        { json: "thursday", js: "thursday", typ: true },
        { json: "friday", js: "friday", typ: true },
        { json: "saturday", js: "saturday", typ: true },
        { json: "sunday", js: "sunday", typ: true },
    ], false),
    "TariffZone": o([
        { json: "zoneName", js: "zoneName", typ: "" },
        { json: "bandType", js: "bandType", typ: "" },
        { json: "endTime", js: "endTime", typ: r("Time") },
    ], false),
    "Time": o([
        { json: "hour", js: "hour", typ: 0 },
        { json: "minute", js: "minute", typ: 0 },
    ], false),
    "GetVehicleContactInformation": o([
        { json: "contactInfos", js: "contactInfos", typ: a(r("ContactInfo")) },
    ], false),
    "GetVehicleSubscriptionPackages": o([
        { json: "subscriptionPackages", js: "subscriptionPackages", typ: a(r("SubscriptionPackage")) },
    ], false),
    "SubscriptionPackage": o([
        { json: "name", js: "name", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "expirationDate", js: "expirationDate", typ: "" },
    ], false),
    "GetVehicleStatus": o([
        { json: "vehicleStatus", js: "vehicleStatus", typ: a(r("VehicleStatus")) },
        { json: "vehicleAlerts", js: "vehicleAlerts", typ: a(r("VehicleAlert")) },
        { json: "lastUpdatedTime", js: "lastUpdatedTime", typ: "" },
    ], false),
    "VehicleAlert": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "lastUpdatedTime", js: "lastUpdatedTime", typ: "" },
    ], false),
    "VehicleStatus": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: u(null, "") },
    ], false),
    "GetVehicleStatusV3": o([
        { json: "vehicleStatus", js: "vehicleStatus", typ: r("GetVehicleStatusV3VehicleStatus") },
        { json: "vehicleAlerts", js: "vehicleAlerts", typ: a(r("VehicleAlert")) },
        { json: "lastUpdatedTime", js: "lastUpdatedTime", typ: "" },
    ], false),
    "GetVehicleStatusV3VehicleStatus": o([
        { json: "coreStatus", js: "coreStatus", typ: a(r("VehicleStatus")) },
        { json: "evStatus", js: "evStatus", typ: a(r("VehicleStatus")) },
    ], false),
    "GetServiceStatus": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a("any") },
    ], false),
    "GetVehicleDepartureTimers": o([
        { json: "departureTimerSetting", js: "departureTimerSetting", typ: r("DepartureTimerSetting") },
        { json: "tariffSettings", js: "tariffSettings", typ: null },
        { json: "triggerUrl", js: "triggerUrl", typ: null },
        { json: "triggerUserId", js: "triggerUserId", typ: null },
        { json: "triggerPassword", js: "triggerPassword", typ: null },
        { json: "triggerMediaType", js: "triggerMediaType", typ: null },
        { json: "startTime", js: "startTime", typ: null },
        { json: "endTime", js: "endTime", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "DepartureTimerSetting": o([
        { json: "timers", js: "timers", typ: a(r("Timer")) },
    ], false),
    "Timer": o([
        { json: "timerIndex", js: "timerIndex", typ: 0 },
        { json: "timerType", js: "timerType", typ: r("TimerType") },
        { json: "departureTime", js: "departureTime", typ: r("Time") },
        { json: "timerTarget", js: "timerTarget", typ: r("TimerTarget") },
    ], false),
    "TimerTarget": o([
        { json: "singleDay", js: "singleDay", typ: null },
        { json: "repeatSchedule", js: "repeatSchedule", typ: r("RepeatSchedule") },
    ], false),
    "TimerType": o([
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: true },
    ], false),
    "GetVehicleWakeupTime": o([
        { json: "wakeupTime", js: "wakeupTime", typ: null },
        { json: "state", js: "state", typ: "" },
        { json: "scheduleWakeup", js: "scheduleWakeup", typ: r("ScheduleWakeup") },
    ], false),
    "ScheduleWakeup": o([
        { json: "scheduleAcceptanceEnd", js: "scheduleAcceptanceEnd", typ: "" },
        { json: "wakeupAcceptanceEnd", js: "wakeupAcceptanceEnd", typ: "" },
    ], false),
    "GetVehicleTrips": o([
        { json: "trips", js: "trips", typ: a(r("Trip")) },
    ], false),
    "Trip": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: null },
        { json: "category", js: "category", typ: null },
        { json: "routeDetails", js: "routeDetails", typ: r("RouteDetails") },
        { json: "tripDetails", js: "tripDetails", typ: r("TripDetails") },
    ], false),
    "RouteDetails": o([
        { json: "route", js: "route", typ: null },
        { json: "totalWaypoints", js: "totalWaypoints", typ: 0 },
        { json: "boundingBox", js: "boundingBox", typ: r("BoundingBox") },
    ], false),
    "BoundingBox": o([
        { json: "minLongitude", js: "minLongitude", typ: u(3.14, null) },
        { json: "minLatitude", js: "minLatitude", typ: u(3.14, null) },
        { json: "maxLongitude", js: "maxLongitude", typ: u(3.14, null) },
        { json: "maxLatitude", js: "maxLatitude", typ: u(3.14, null) },
    ], false),
    "TripDetails": o([
        { json: "electricalConsumption", js: "electricalConsumption", typ: null },
        { json: "electricalRegeneration", js: "electricalRegeneration", typ: null },
        { json: "fuelConsumption", js: "fuelConsumption", typ: null },
        { json: "distance", js: "distance", typ: 0 },
        { json: "startOdometer", js: "startOdometer", typ: 0 },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "startPosition", js: "startPosition", typ: r("Position") },
        { json: "endOdometer", js: "endOdometer", typ: 0 },
        { json: "endTime", js: "endTime", typ: "" },
        { json: "endPosition", js: "endPosition", typ: r("Position") },
        { json: "totalEcoScore", js: "totalEcoScore", typ: r("EcoScore") },
        { json: "throttleEcoScore", js: "throttleEcoScore", typ: r("EcoScore") },
        { json: "speedEcoScore", js: "speedEcoScore", typ: r("EcoScore") },
        { json: "brakeEcoScore", js: "brakeEcoScore", typ: r("EcoScore") },
        { json: "averageSpeed", js: "averageSpeed", typ: 3.14 },
        { json: "averageFuelConsumption", js: "averageFuelConsumption", typ: null },
    ], false),
    "EcoScore": o([
        { json: "score", js: "score", typ: 3.14 },
        { json: "scoreStatus", js: "scoreStatus", typ: r("ScoreStatus") },
    ], false),
    "Position": o([
        { json: "latitude", js: "latitude", typ: 3.14 },
        { json: "longitude", js: "longitude", typ: 3.14 },
        { json: "address", js: "address", typ: "" },
        { json: "postalCode", js: "postalCode", typ: u(null, "") },
        { json: "city", js: "city", typ: u(null, "") },
        { json: "region", js: "region", typ: u(r("Region"), null) },
        { json: "country", js: "country", typ: r("Country") },
    ], false),
    "GetVehicleTrip": o([
        { json: "waypoints", js: "waypoints", typ: a(r("Waypoint")) },
    ], false),
    "Waypoint": o([
        { json: "timestamp", js: "timestamp", typ: "" },
        { json: "odometer", js: "odometer", typ: 0 },
        { json: "fuelConsumption", js: "fuelConsumption", typ: null },
        { json: "electricalConsumption", js: "electricalConsumption", typ: null },
        { json: "electricalRegeneration", js: "electricalRegeneration", typ: null },
        { json: "position", js: "position", typ: r("WaypointPosition") },
    ], false),
    "WaypointPosition": o([
        { json: "latitude", js: "latitude", typ: 3.14 },
        { json: "longitude", js: "longitude", typ: 3.14 },
        { json: "speed", js: "speed", typ: null },
        { json: "heading", js: "heading", typ: 0 },
    ], false),
    "GetVehiclePosition": o([
        { json: "position", js: "position", typ: r("GetVehiclePositionPosition") },
        { json: "calculatedPosition", js: "calculatedPosition", typ: null },
    ], false),
    "GetVehiclePositionPosition": o([
        { json: "longitude", js: "longitude", typ: 3.14 },
        { json: "latitude", js: "latitude", typ: 3.14 },
        { json: "timestamp", js: "timestamp", typ: "" },
        { json: "speed", js: "speed", typ: 0 },
        { json: "heading", js: "heading", typ: 0 },
        { json: "positionQuality", js: "positionQuality", typ: null },
    ], false),
    "GetVehicleHealthStatus": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "GetUserInfoFromID": o([
        { json: "contact", js: "contact", typ: r("Contact") },
        { json: "homeAddress", js: "homeAddress", typ: r("HomeAddress") },
        { json: "homeMarket", js: "homeMarket", typ: "" },
        { json: "userId", js: "userId", typ: "" },
        { json: "loginName", js: "loginName", typ: "" },
        { json: "userType", js: "userType", typ: null },
        { json: "nextOfKin", js: "nextOfKin", typ: null },
        { json: "pin", js: "pin", typ: null },
        { json: "secureQuestion1", js: "secureQuestion1", typ: null },
        { json: "secureQuestion2", js: "secureQuestion2", typ: null },
        { json: "secureQuestion3", js: "secureQuestion3", typ: null },
        { json: "secureAnswer1", js: "secureAnswer1", typ: null },
        { json: "secureAnswer2", js: "secureAnswer2", typ: null },
        { json: "secureAnswer3", js: "secureAnswer3", typ: null },
        { json: "authCredentials", js: "authCredentials", typ: null },
        { json: "marketingPrefsUpdatedAt", js: "marketingPrefsUpdatedAt", typ: "" },
        { json: "marketingOffersAccepted", js: "marketingOffersAccepted", typ: true },
        { json: "vhsMessagesAccepted", js: "vhsMessagesAccepted", typ: true },
    ], false),
    "GetVehiclesForUserID": o([
        { json: "vehicles", js: "vehicles", typ: a(r("Vehicle")) },
    ], false),
    "Vehicle": o([
        { json: "userId", js: "userId", typ: "" },
        { json: "vin", js: "vin", typ: "" },
        { json: "role", js: "role", typ: "" },
    ], false),
    "HonkHorn": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "LockVehicle": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
    ], false),
    "UnlockVehicle": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
    ], false),
    "StopAlarm": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "StartClimatePreconditioning": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "StopClimatePreconditioning": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "StartCharging": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "StopCharging": o([
        { json: "errorLabel", js: "errorLabel", typ: "" },
        { json: "errorDescription", js: "errorDescription", typ: "" },
    ], false),
    "SetMaxStateOfCharge": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "SetOneOffMaxStateOfCharge": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "AddDepartureTimer": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "AddRepeatedDepartureTimer": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "DeleteDepartureTimers": o([
        { json: "errorLabel", js: "errorLabel", typ: "" },
        { json: "errorDescription", js: "errorDescription", typ: "" },
    ], false),
    "AddChargingPeriod": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "PrioritizeClimate": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: a(r("VehicleStatus")) },
    ], false),
    "AddWakeUpTime": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
    ], false),
    "StopWakeUpTime": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
    ], false),
    "EnableServiceMode": o([
        { json: "status", js: "status", typ: "" },
        { json: "statusTimestamp", js: "statusTimestamp", typ: "" },
        { json: "startTime", js: "startTime", typ: "" },
        { json: "serviceType", js: "serviceType", typ: "" },
        { json: "failureDescription", js: "failureDescription", typ: "" },
        { json: "customerServiceId", js: "customerServiceId", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "active", js: "active", typ: true },
        { json: "initiator", js: "initiator", typ: "" },
        { json: "eventTrigger", js: "eventTrigger", typ: null },
        { json: "serviceCommand", js: "serviceCommand", typ: null },
        { json: "serviceParameters", js: "serviceParameters", typ: null },
    ], false),
    "EnableTransportMode": o([
        { json: "errorLabel", js: "errorLabel", typ: "" },
        { json: "errorDescription", js: "errorDescription", typ: "" },
    ], false),
    "EnablePrivacySwitch": o([
        { json: "errorLabel", js: "errorLabel", typ: "" },
        { json: "errorDescription", js: "errorDescription", typ: "" },
    ], false),
    "DisablePrivacySwitch": o([
        { json: "errorLabel", js: "errorLabel", typ: "" },
        { json: "errorDescription", js: "errorDescription", typ: "" },
    ], false),
    "AuthenticateVHS": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateHBLF": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateECC": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateCP": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateRDL": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateRDU": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateALOFF": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticatePROV": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AuthenticateSWU": o([
        { json: "token", js: "token", typ: "" },
    ], false),
    "AppVersionCheck": o([
        { json: "state", js: "state", typ: "" },
    ], false),
    "ReverseGeocode": o([
        { json: "formattedAddress", js: "formattedAddress", typ: "" },
        { json: "street", js: "street", typ: "" },
        { json: "streetNumber", js: "streetNumber", typ: "" },
        { json: "postalcode", js: "postalcode", typ: "" },
        { json: "city", js: "city", typ: null },
        { json: "citycode", js: "citycode", typ: null },
        { json: "region", js: "region", typ: "" },
        { json: "regionCode", js: "regionCode", typ: null },
        { json: "country", js: "country", typ: "" },
        { json: "countryCodeISO2", js: "countryCodeISO2", typ: "" },
        { json: "province", js: "province", typ: "" },
        { json: "district", js: "district", typ: null },
        { json: "telephoneAreaCode", js: "telephoneAreaCode", typ: null },
        { json: "additionalInfo", js: "additionalInfo", typ: null },
        { json: "provinceAdcode", js: "provinceAdcode", typ: null },
        { json: "cityAdcode", js: "cityAdcode", typ: null },
        { json: "districtAdcode", js: "districtAdcode", typ: null },
        { json: "adcode", js: "adcode", typ: null },
        { json: "any", js: "any", typ: null },
    ], false),
    "ScoreStatus": [
        "VALID",
    ],
    "Country": [
        "United Kingdom",
    ],
    "Region": [
        "England",
    ],
};
