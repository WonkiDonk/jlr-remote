import axios from 'axios'
import { baseUrls, getHeaders } from './ServiceHelpers'
import { QueryVehicleInformationService } from './Services'
import { ContactInformation, CurrentVehicleResponseV3, CurrentVehicleStatus, ServiceStatus, VehicleAttributes, VehicleContactInformation, VehicleDepartureTimers, VehicleHealthStatus, VehiclePosition, VehicleSubscriptionPackages, VehicleTariffs, VehicleTrip, VehicleTrips, VehicleWakeupTime } from './ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL

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

    getVehicleStatusV3: async (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleResponseV3> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.ngtp.org.if9.healthstatus-v3+json' })
        const response = await axios.get<CurrentVehicleResponseV3>(`${baseUrl}/vehicles/${vin}/status?includeInactive=true`, { headers })

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

export default queryVehicleInformationService
