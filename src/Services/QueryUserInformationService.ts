import axios from "axios"
import { baseUrls, getHeaders } from "./ServiceHelpers"
import { UserInfo, Vehicles } from "./ServiceTypes"

const baseUrl = baseUrls.IF9_BASE_URL

/**
 * Queries User Information
 */
export interface QueryUserInformationService {
    /**
     * List user information based on the user ID.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param userId User Identifier
     */
    getUserInfoFromId: (accessToken: string, deviceId: string, userId: string) => Promise<UserInfo>

    /**
     * Lists the vehicles associated with the specified user id. It is unclear at this time what
     * the `primaryOnly` parameter does as all vehicles associated with the user id will be
     * returned regardless. It is possible that this parameter is simply not used for anything.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param userId User Identifier
     * @param primaryOnly Boolean value indicating whether to query the primary vehicle only
     */
    getVehiclesForUser: (accessToken: string, deviceId: string, userId: string, primaryOnly?: boolean) => Promise<Vehicles>
}

const queryUserInformationService: QueryUserInformationService = {
    getUserInfoFromId: async (accessToken: string, deviceId: string, userId: string): Promise<UserInfo> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.User-v3+json' })
        const response = await axios.get<UserInfo>(`${baseUrl}/users/${userId}`, { headers })

        return response.data
    },

    getVehiclesForUser: async (accessToken: string, deviceId: string, userId: string, primaryOnly: boolean = false): Promise<Vehicles> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<Vehicles>(`${baseUrl}/users/${userId}/vehicles?primaryOnly=${primaryOnly}`, { headers })

        return response.data
    }
}

export default queryUserInformationService
