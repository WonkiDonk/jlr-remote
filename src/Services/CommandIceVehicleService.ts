import axios from 'axios'
import { baseUrls, getHeaders } from '../JaguarLandRover/ServiceHelpers'
import { ServiceError, ServiceStatus } from '../JaguarLandRover/ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL

/**
 * Sends Internal Combustion Engine (ICE) Vehicle-specific Commands
 */
interface CommandIceVehicleService {
    /**
     * Remote starts the vehicle engine. Requires a REON Token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param reonToken REON Token
     */
    remoteEngineStart: (accessToken: string, deviceId: string, vin: string, reonToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Remote stops the vehicle engine. Requires a REOFF Token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param reoffToken REOFF Token
     */
    remoteEngineStop: (accessToken: string, deviceId: string, vin: string, reoffToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Puts the vehicle into Provisioning Mode. Requires a PROV Token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param provToken PROV Token
     */
    enableProvisioningMode: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Sets the Remote Climate Control Target Temperature.
     * 
     * This operation requires the engine to be started and the vehicle
     * to be in Provisioning Mode.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param targetTemperature Target Temperature
     */
    setRemoteClimateControlTargetTemperature: (accessToken: string, deviceId: string, vin: string, targetTemperature?: number) => Promise<ServiceStatus | ServiceError>
}

const commandIceVehicleService: CommandIceVehicleService = {
    remoteEngineStart: async (accessToken: string, deviceId: string, vin: string, reonToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: reonToken, serviceName: 'REON' }
        const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v2+json' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/engineOn`, command, { headers })

        return response.data
    },

    remoteEngineStop: async (accessToken: string, deviceId: string, vin: string, reoffToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: reoffToken, serviceName: 'REOFF' }
        const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v2+json' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/engineOff`, command, { headers })

        return response.data
    },

    enableProvisioningMode: async (accessToken: string, deviceId: string, vin: string, provToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setRemoteClimateControlTargetTemperature: async (accessToken: string, deviceId: string, vin: string, targetTemperature?: number | undefined): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') }
}

export { CommandIceVehicleService, commandIceVehicleService }
