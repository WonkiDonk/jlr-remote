import { CommandVehicleService } from './Services'
import { ServiceStatus, ServiceError } from './ServiceTypes'

const commandVehicleService: CommandVehicleService = {
    disablePrivacySwitch: (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    enablePrivacySwitch: (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    enableServiceMode: (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    enableTransportMode: (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    honkHorn: (accessToken: string, deviceId: string, vin: string, hblfToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    lockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setVehicleNicknameAndRegistration: (accessToken: string, deviceId: string, vin: string, nickname: string, registrationNumber: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    stopAlarm: (accessToken: string, deviceId: string, vin: string, aloffToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    unlockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') }
}

export default commandVehicleService
