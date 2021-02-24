import axios from 'axios'
import { baseUrls, getHeaders } from '../JaguarLandRover/ServiceHelpers'

const baseUrl = baseUrls.IF9_BASE_URL

interface CommandToken {
    token: string
}

interface CommandAuthenticationService {
    /**
     * Authenticate to the ALOFF service. This requires the client to pass the user's personal
     * PIN. The ALOFF service is used for remotely resetting the vehicle alarm.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param userPin User's Personal PIN
     */
    getAloffToken: (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string) => Promise<CommandToken>

    /**
     * Authenticate to the CP service. This requires the client to pass a PIN which is the last
     * four digits in the vehicle VIN. The CP service authentication is required for charging
     * profile related operations.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param lastFourOfVin Last Four Digits of the VIN
     */
    getCpToken: (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string) => Promise<CommandToken>

    /**
     * Authenticate to the ECC service. This requires the client to pass a PIN which can be any
     * arbitrary value, including an empty one. However, the mobile app passes the last four
     * digits in the vehicle VIN. The ECC service authentication is required for climate
     * preconditoning controls.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param lastFourOfVin Last Four Digits of the VIN
     */
    getEccToken: (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string) => Promise<CommandToken>

    /**
     * Authenticate to the HBLF service. This requires the client to pass a PIN which is the
     * last four digits in the vehicle VIN. I'm assuming HBLF stands for HonkBlink Something
     * something and you need the token returned from this authentication operation to send the
     * honkblink command.
     * 
     * In order to authenticate to the service, the last four digits of the vehicle VIN number
     * need to be supplied in the body.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param lastFourOfVin Last Four Digits of the VIN
     */
    getHblfToken: (accessToken: string, deviceId: string, vin: string, userId: string, lastFourOfVin: string) => Promise<CommandToken>

    /**
     * Authenticate to the PROV service. This requires the client to pass the user's personal
     * PIN. This service is used for enabling and disabling service mode.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param userPin User's Personal PIN
     */
    getProvToken: (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string) => Promise<CommandToken>

    /**
     * Authenticate to the RDU service. This requires the client to pass the user's personal
     * PIN. The RDU service is used for remotely unlocking the vehicle.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param userPin User's Personal PIN
     */
    getRdlToken: (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string) => Promise<CommandToken>

    /**
     * Authenticate to the RDU service. This requires the client to pass the user's personal
     * PIN. The RDU service is used for remotely unlocking the vehicle.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     * @param userPin User's Personal PIN
     */
    getRduToken: (accessToken: string, deviceId: string, vin: string, userId: string, userPin: string) => Promise<CommandToken>

    /**
     * Authenticate to the SWU service. This requires the client to pass an empty PIN value. The
     * SWU service is used for setting wake up timers.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     */
    getSwuToken: (accessToken: string, deviceId: string, vin: string, userId: string) => Promise<CommandToken>

    /**
     * Authenticate to the VHS service and obtain the VHS authorization token. This is required
     * for certain vehicle related operations. Retrieving vehicle health status is one example
     * of such an operation.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param userId User Identifier
     */
    getVhsToken: (accessToken: string, deviceId: string, vin: string, userId: string) => Promise<CommandToken>
}

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

export { CommandAuthenticationService, commandAuthenticationService }
