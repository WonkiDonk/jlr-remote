import { QueryVehicleInformationService } from './Services'
import { ContactInformation, ServiceStatus, VehicleAttributes, VehicleContactInformation, VehicleDepartureTimers, VehicleHealthStatus, VehiclePosition, CurrentVehicleStatus, CurrentVehicleResponseV3, VehicleSubscriptionPackages, VehicleTariffs, VehicleTrip, VehicleTrips, VehicleWakeupTime } from './ServiceTypes'

const queryVehicleInformationService: QueryVehicleInformationService = {
    getContactInformation: (accessToken: string, deviceId: string, vin: string, mcc: string): Promise<ContactInformation> => { throw new Error('Not implemented.') },

    getServiceStatus: (accessToken: string, deviceId: string, vin: string, customerServiceId: string): Promise<ServiceStatus> => { throw new Error('Not implemented.') },

    getVehicleAttributes: (accessToken: string, deviceId: string, vin: string): Promise<VehicleAttributes> => { throw new Error('Not implemented.') },

    getVehicleContactInformation: (accessToken: string, deviceId: string, vin: string): Promise<VehicleContactInformation> => { throw new Error('Not implemented.') },

    getVehicleDepartureTimers: (accessToken: string, deviceId: string, vin: string): Promise<VehicleDepartureTimers> => { throw new Error('Not implemented.') },

    getVehicleHealthStatus: (accessToken: string, deviceId: string, vin: string): Promise<VehicleHealthStatus> => { throw new Error('Not implemented.') },

    getVehiclePosition: (accessToken: string, deviceId: string, vin: string): Promise<VehiclePosition> => { throw new Error('Not implemented.') },

    getVehicleStatus: (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleStatus> => { throw new Error('Not implemented.') },

    getVehicleStatusV3: (accessToken: string, deviceId: string, vin: string): Promise<CurrentVehicleResponseV3> => { throw new Error('Not implemented.') },

    getVehicleSubscriptionPackages: (accessToken: string, deviceId: string, vin: string): Promise<VehicleSubscriptionPackages> => { throw new Error('Not implemented.') },

    getVehicleTariffs: (accessToken: string, deviceId: string, vin: string): Promise<VehicleTariffs> => { throw new Error('Not implemented.') },

    getVehicleTrip: (accessToken: string, deviceId: string, vin: string, tripId: string): Promise<VehicleTrip> => { throw new Error('Not implemented.') },

    getVehicleTrips: (accessToken: string, deviceId: string, vin: string): Promise<VehicleTrips> => { throw new Error('Not implemented.') },

    getVehicleWakeupTime: (accessToken: string, deviceId: string, vin: string): Promise<VehicleWakeupTime> => { throw new Error('Not implemented.') },
}

export default queryVehicleInformationService
