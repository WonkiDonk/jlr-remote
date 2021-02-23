
import { Auth, LoginUserResponse, RefreshTokenResponse } from '../Services/ServiceTypes'
import { AuthenticationService } from './Services'
import { baseUrls, getHeaders } from '../Services/ServiceHelpers'
import axios from 'axios'

const authenticationService: AuthenticationService = {
    authenticate: async (deviceId: string, username: string, password: string): Promise<Auth> => {
        const data = { grant_type: 'password', password, username }
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic YXM6YXNwYXNz', 'X-Device-Id': deviceId, 'Connection': 'close' }
        const response = await axios.post(`${baseUrls.IFAS_BASE_URL}/tokens`, data, { headers })
    
        return response.data
    },

    refreshToken: async (deviceId: string, refreshToken: string): Promise<RefreshTokenResponse> => {
        const data = { grant_type: 'refresh_token', refresh_token: refreshToken }
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic YXM6YXNwYXNz', 'X-Device-Id': deviceId, 'Connection': 'close' }
        const response = await axios.post(`${baseUrls.IFAS_BASE_URL}/tokens`, data, { headers })
    
        return response.data
    },

    registerDevice: async (accessToken: string, deviceId: string, authorizationToken: string, expiresIn: string, username: string): Promise<boolean> => {
        const data = { access_token: accessToken, authorization_token: authorizationToken, expires_in: expiresIn, deviceID: deviceId }
        const headers = getHeaders(accessToken, deviceId, { 'Connection': 'close' })
        const response = await axios.post(`${baseUrls.IFOP_BASE_ULR}/users/${username}/clients`, data, { headers })

        return response.status === 204
    },

    loginUser: async (accessToken: string, deviceId: string, username: string): Promise<LoginUserResponse> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.User-v3+json' })
        const response = await axios.get(`${baseUrls.IF9_BASE_URL}/users?loginName=${username}`, { headers })

        return response.data
    }
}

export default authenticationService
