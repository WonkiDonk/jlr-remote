import axios from 'axios'
import { baseUrls, getHeaders } from './ServiceHelpers'
import { CommandVehicleService } from './Services'
import { ServiceError, ServiceStatus } from './ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL
const tenHoursInSeconds = 60 * 60 *10

const commandVehicleService: CommandVehicleService = {
    disablePrivacySwitch: async (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: provToken, serviceCommand: "privacySwitch_off", startTime: null, endTime: null }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/prov`, command, { headers })

        return response.data
    },

    enablePrivacySwitch: async (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: provToken, serviceCommand: "privacySwitch_on", startTime: null, endTime: null }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/prov`, command, { headers })

        return response.data
    },

    enableServiceMode: async (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: provToken, serviceCommand: "protectionStrategy_serviceMode", startTime: null, endTime: Math.floor(+(new Date()) / 1000 + tenHoursInSeconds) }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/prov`, command, { headers })

        return response.data
    },

    enableTransportMode: (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    honkHorn: (accessToken: string, deviceId: string, vin: string, hblfToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    lockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setVehicleNicknameAndRegistration: (accessToken: string, deviceId: string, vin: string, nickname: string, registrationNumber: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    stopAlarm: (accessToken: string, deviceId: string, vin: string, aloffToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    unlockVehicle: (accessToken: string, deviceId: string, vin: string, rdlToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') }
}

export default commandVehicleService
