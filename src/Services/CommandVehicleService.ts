import axios from 'axios'
import { baseUrls, getHeaders } from './ServiceHelpers'
import { ServiceError, ServiceStatus } from './ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL
const tenHoursInSeconds = 60 * 60 * 10

/**
 * Sends Vehicle Commands
 */
interface CommandVehicleService {
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
     * @param rduToken RDU Token
     */
    unlockVehicle: (accessToken: string, deviceId: string, vin: string, rduToken: string) => Promise<ServiceStatus | ServiceError>
}

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

export { CommandVehicleService, commandVehicleService }
