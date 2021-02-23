import axios from 'axios'
import { baseUrls, getHeaders } from '../Services/ServiceHelpers'
import { CommandAuthenticationService, CommandToken } from './Services'

const baseUrl = baseUrls.IF9_BASE_URL

const getCommandToken = async (accessToken: string, deviceId: string, vin: string, userId: string, serviceName: string, pin: string): Promise<CommandToken> => {
    const command = { serviceName, pin }
    const headers = getHeaders(accessToken, deviceId, { 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json; charset=utf-8' })
    const response = await axios.post(`${baseUrl}/vehicles/${vin}/users/${userId}/authenticate`, command, { headers })

    return response.data
}

const commandAuthenticationService: CommandAuthenticationService = {
    getAloffToken: async (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'ALOFF', userPin),

    getCpToken: async (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'CP', lastFourOfVin),

    getEccToken: async (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'ECC', lastFourOfVin),

    getHblfToken: async (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'HBLF', lastFourOfVin),

    getProvToken: async (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'PROV', userPin),

    getRdlToken: async (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'RDL', userPin),

    getRduToken: async (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'RDU', userPin),

    getSwuToken: async (accessToken: string, deviceId: string, vin: string, userId: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'SWU', ''),

    getVhsToken: async (accessToken: string, deviceId: string, vin: string, userId: string): Promise<CommandToken> => getCommandToken(accessToken, deviceId, vin, userId, 'VHS', '')
}

export default commandAuthenticationService