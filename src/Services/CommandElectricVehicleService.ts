import { CommandElectricVehicleService } from './Services'
import { ServiceStatus, ServiceError, RepeatSchedule } from './ServiceTypes'

const commandElectricVehicleService: CommandElectricVehicleService = {
    stopClimatePreconditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    startClimatePrecdonditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    startCharging: (accessToken: string, deviceId: string, vin: string, eccToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    stopCharging: (accessToken: string, deviceId: string, vin: string, eccToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setOneOfMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, maxStateOfCharge: number): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    addDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    addRepeatedDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date, repeatSchedule: RepeatSchedule): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    deleteDepartureTimers: (accessToken: string, deviceId: string, vin: string, cpToken: string, timerIndex: number): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setPriority: (accessToken: string, deviceId: string, vin: string, eccToken: string, priority: 'PRIORITIZE_RANGE' | 'PRIORITIZE_COMFORT'): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    addWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string, wakeupTime: Date): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    stopWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

}

export default commandElectricVehicleService
