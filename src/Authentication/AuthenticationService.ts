
import { Auth, RefreshTokenResponse } from '../Services/ServiceTypes'
import { AuthenticationService } from './Services'

const authenticationService: AuthenticationService = {
    authenticate: async (deviceId: string, username: string, password: string): Promise<Auth> => { throw new Error('Not implemented') },

    refreshToken: async (deviceId: string, refreshToken: string): Promise<RefreshTokenResponse> => { throw new Error('Not implemented') },

    registerDevice: async (accessToken: string, deviceId: string, authorizationToken: string, expiresIn: string): Promise<void> => { throw new Error('Not implemented') },

    loginUser: async (accessToken: string, deviceId: string, username: string): Promise<void> => { throw new Error('Not implemented') }
}

export default authenticationService
