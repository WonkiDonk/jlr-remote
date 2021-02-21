import axios from "axios"
import { baseUrls, getHeaders } from "./ServiceHelpers"
import { QueryUserInformationService } from "./Services"
import { UserInfo, Vehicles } from "./ServiceTypes"

const baseUrl = baseUrls.IF9_BASE_URL

const queryUserInformationService: QueryUserInformationService = {
    getUserInfoFromId: async (accessToken: string, deviceId: string, userId: string): Promise<UserInfo> => {
        const headers = getHeaders(accessToken, deviceId, {'Accept': 'application/vnd.wirelesscar.ngtp.if9.User-v3+json'})
        const response = await axios.get<UserInfo>(`${baseUrl}/users/${userId}`, {headers})
        
        return response.data
    },

    getVehiclesForUser: async (accessToken: string, deviceId: string, userId: string): Promise<Vehicles> => { throw new Error('Not implemented') }
}

export default queryUserInformationService
