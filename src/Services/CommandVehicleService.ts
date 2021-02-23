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

    enableTransportMode: async (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: provToken, serviceCommand: "protectionStrategy_transportMode", startTime: null, endTime: Math.floor(+(new Date()) / 1000 + tenHoursInSeconds) }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/prov`, command, { headers })

        return response.data
    },

    honkHorn: async (accessToken: string, deviceId: string, vin: string, hblfToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: hblfToken }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/honkBlink`, command, { headers })

        return response.data
    },

    lockVehicle: async (accessToken: string, deviceId: string, vin: string, rdlToken: string): Promise<ServiceStatus | ServiceError> => { 
        const command = { token: rdlToken }
        const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v2+json' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/lock`, command, { headers })

        return response.data
     },

    setVehicleNicknameAndRegistration: async (accessToken: string, deviceId: string, vin: string, nickname: string, registrationNumber: string): Promise<ServiceStatus | ServiceError> => {
        const command = { nickname, registrationNumber }
        const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.ngtp.org.VehicleAttributes-v4+json' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/attributes`, command, { headers })

        return response.data
    },

    stopAlarm: async (accessToken: string, deviceId: string, vin: string, aloffToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: aloffToken }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/alarmOff`, command, { headers })

        return response.data
    },

    unlockVehicle: async (accessToken: string, deviceId: string, vin: string, rduToken: string): Promise<ServiceStatus | ServiceError> => { 
        const command = { token: rduToken }
        const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v2+json' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/unlock`, command, { headers })

        return response.data
     }
}

export default commandVehicleService
