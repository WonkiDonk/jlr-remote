import axios from 'axios'
import { QueryVehicleInformationService } from './Services'
import { ContactInformation, ServiceStatus, VehicleAttributes, VehicleContactInformation, VehicleDepartureTimers, VehicleHealthStatus, VehiclePosition, CurrentVehicleStatus, CurrentVehicleResponseV3, VehicleSubscriptionPackages, VehicleTariffs, VehicleTrip, VehicleTrips, VehicleWakeupTime } from './ServiceTypes'

const IFAS_BASE_URL = 'https://ifas.prod-row.jlrmotor.com/ifas/jlr'
const IFOP_BASE_ULR = 'https://ifop.prod-row.jlrmotor.com/ifop/jlr'
const IF9_BASE_URL = 'https://if9.prod-row.jlrmotor.com/if9/jlr'

const getHeaders = (accessToken: string, deviceId: string, partial?: any) => {
    return {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
        'Authorization': `Bearer ${accessToken}`,
        ...partial
    }
}

const queryVehicleInformationService: QueryVehicleInformationService = {
    getContactInformation: async (accessToken: string, deviceId: string, vin: string, mcc: string): Promise<ContactInformation> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<ContactInformation>(`${IF9_BASE_URL}/vehicles/${vin}/contactinfo/${mcc}`, {headers})
        
        return response.data
    },

    getServiceStatus: async (accessToken: string, deviceId: string, vin: string, customerServiceId: string): Promise<ServiceStatus> => { 
        const headers = getHeaders(accessToken, deviceId, {'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json'})
        const response = await axios.get<ServiceStatus>(`${IF9_BASE_URL}/vehicles/${vin}/services/${customerServiceId}`, {headers})
        
        return response.data
    },

    getVehicleAttributes: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleAttributes> => {
        const headers = getHeaders(accessToken, deviceId, {'Accept': 'application/vnd.ngtp.org.VehicleAttributes-v3+json'})
        const response = await axios.get<VehicleAttributes>(`${IF9_BASE_URL}/vehicles/${vin}/attributes`, {headers})
        
        return response.data
    },

    getVehicleContactInformation: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleContactInformation> => { throw new Error('Not implemented.') },

    getVehicleDepartureTimers: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleDepartureTimers> => { throw new Error('Not implemented.') },

    getVehicleHealthStatus: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleHealthStatus> => { throw new Error('Not implemented.') },

    getVehiclePosition: async (accessToken: string, deviceId: string, vin: string): Promise<VehiclePosition> => { throw new Error('Not implemented.') },

    getVehicleStatus: async (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleStatus> => { throw new Error('Not implemented.') },

    getVehicleStatusV3: async (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleResponseV3> => { throw new Error('Not implemented.') },

    getVehicleSubscriptionPackages: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleSubscriptionPackages> => { throw new Error('Not implemented.') },

    getVehicleTariffs: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleTariffs> => { throw new Error('Not implemented.') },

    getVehicleTrip: async (accessToken: string, deviceId: string, vin: string, tripId: string): Promise<VehicleTrip> => { throw new Error('Not implemented.') },

    getVehicleTrips: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleTrips> => { throw new Error('Not implemented.') },

    getVehicleWakeupTime: async (accessToken: string, deviceId: string, vin: string): Promise<VehicleWakeupTime> => { throw new Error('Not implemented.') }
}

export default queryVehicleInformationService
