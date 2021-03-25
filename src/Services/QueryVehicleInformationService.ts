import axios from 'axios'
import { baseUrls, getHeaders } from '../JaguarLandRover/ServiceHelpers'
import {
    ContactInformation,
    CurrentVehicleStatusV3,
    CurrentVehicleStatus,
    ServiceStatus,
    VehicleAttributes,
    VehicleContactInformation,
    VehicleDepartureTimers,
    VehicleHealthStatus,
    VehiclePosition,
    VehicleSubscriptionPackages,
    VehicleTariffs,
    VehicleTrip,
    VehicleTrips,
    VehicleWakeupTime
} from '../JaguarLandRover/ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL

/**
 * Queries Vehicle Information
 */
interface QueryVehicleInformationService {
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
     * @param vhsToken VHS Token
     */
    getVehicleHealthStatus: (accessToken: string, deviceId: string, vin: string, vhsToken: string) => Promise<VehicleHealthStatus>

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
    getVehicleStatusV3: (accessToken: string, deviceId: string, vin: string) => Promise<CurrentVehicleStatusV3>

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

const queryVehicleInformationService: QueryVehicleInformationService = {
    getContactInformation: async (accessToken: string, deviceId: string, vin: string, mcc: string): Promise<ContactInformation> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<ContactInformation>(`${baseUrl}/vehicles/${vin}/contactinfo/${mcc}`, { headers })

        return response.data
    },

    getServiceStatus: async (accessToken: string, deviceId: string, vin: string, customerServiceId: string): Promise<ServiceStatus> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json' })
        const response = await axios.get<ServiceStatus>(`${baseUrl}/vehicles/${vin}/services/${customerServiceId}`, { headers })

        return response.data
    },

    getVehicleAttributes: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleAttributes> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.ngtp.org.VehicleAttributes-v3+json' })
        const response = await axios.get<VehicleAttributes>(`${baseUrl}/vehicles/${vin}/attributes`, { headers })

        return response.data
    },

    getVehicleContactInformation: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleContactInformation> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<VehicleContactInformation>(`${baseUrl}/vehicles/${vin}/contactinfo/310`, { headers })

        return response.data
    },

    getVehicleDepartureTimers: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleDepartureTimers> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.DepartureTimerSettings-v1+json' })
        const response = await axios.get<VehicleDepartureTimers>(`${baseUrl}/vehicles/${vin}/departuretimers`, { headers })

        return response.data
    },

    getVehicleHealthStatus: async (accessToken: string, deviceId: string, vin: string, vhsToken: string): Promise<VehicleHealthStatus> => {
        const headers = getHeaders(accessToken, deviceId, {
            'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json',
            'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8'
        })
        const response = await axios.post<VehicleHealthStatus>(
            `${baseUrl}/vehicles/${vin}/healthstatus`,
            { token: vhsToken },
            { headers })

        return response.data
    },

    getVehiclePosition: async (accessToken: string, deviceId: string, vin: string): Promise<VehiclePosition> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<VehiclePosition>(`${baseUrl}/vehicles/${vin}/position`, { headers })

        return response.data
    },

    getVehicleStatus: async (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleStatus> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.ngtp.org.if9.healthstatus-v2+json' })
        const response = await axios.get<CurrentVehicleStatus>(`${baseUrl}/vehicles/${vin}/status`, { headers })

        return response.data
    },

    getVehicleStatusV3: async (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleStatusV3> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.ngtp.org.if9.healthstatus-v3+json' })
        const response = await axios.get<CurrentVehicleStatusV3>(`${baseUrl}/vehicles/${vin}/status?includeInactive=true`, { headers })

        return response.data
    },

    getVehicleSubscriptionPackages: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleSubscriptionPackages> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<VehicleSubscriptionPackages>(`${baseUrl}/vehicles/${vin}/subscriptionpackages`, { headers })

        return response.data
    },

    getVehicleTariffs: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleTariffs> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.TariffSettings-v1+json' })
        const response = await axios.get<VehicleTariffs>(`${baseUrl}/vehicles/${vin}/tariffs`, { headers })

        return response.data
    },

    getVehicleTrip: async (accessToken: string, deviceId: string, vin: string, tripId: string): Promise<VehicleTrip> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<VehicleTrip>(`${baseUrl}/vehicles/${vin}/trips/${tripId}/route?pageSize=1000&page=0`, { headers })

        return response.data
    },

    getVehicleTrips: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleTrips> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': '*/*', 'Content-Type': 'application/vnd.ngtp.org.triplist-v2+json' })
        const response = await axios.get<VehicleTrips>(`${baseUrl}/vehicles/${vin}/trips?count=1000`, { headers })

        return response.data
    },

    getVehicleWakeupTime: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleWakeupTime> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.VehicleWakeupTime-v2+json' })
        const response = await axios.get<VehicleWakeupTime>(`${baseUrl}/vehicles/${vin}/wakeuptime`, { headers })

        return response.data
    }
}

export { QueryVehicleInformationService, queryVehicleInformationService }
