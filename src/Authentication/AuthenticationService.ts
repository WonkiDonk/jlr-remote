
import { Auth, RefreshTokenResponse } from '../Services/ServiceTypes'
import { AuthenticationService } from './Services'
import { baseUrls } from '../Services/ServiceHelpers'
import axios from 'axios'

const authenticationService: AuthenticationService = {
    authenticate: async (deviceId: string, username: string, password: string): Promise<Auth> => {
        const data = { grant_type: 'password', password, username }
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic YXM6YXNwYXNz', 'X-Device-Id': deviceId, 'Connection': 'close' }
        const response = await axios.post(`${baseUrls.IFAS_BASE_URL}/tokens`, data, { headers })
    
        return response.data
    },

    refreshToken: async (deviceId: string, refreshToken: string): Promise<RefreshTokenResponse> => { throw new Error('Not implemented') },

    registerDevice: async (accessToken: string, deviceId: string, authorizationToken: string, expiresIn: string, username: string): Promise<void> => {
        const data = { access_token: accessToken, authorization_token: authorizationToken, expires_in: expiresIn, deviceID: deviceId }
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic YXM6YXNwYXNz', 'X-Device-Id': deviceId, 'Connection': 'close' }
        const response = await axios.post(`${baseUrls.IFOP_BASE_ULR}/users/${username}/clients`, data, { headers })
    
        return response.data
    },

    loginUser: async (accessToken: string, deviceId: string, username: string): Promise<void> => { throw new Error('Not implemented') }
}

export default authenticationService
