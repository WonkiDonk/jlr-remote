import axios from 'axios'
import { baseUrls, getHeaders } from '../JaguarLandRover/ServiceHelpers'
import { Auth, LoginUserResponse, RefreshTokenResponse } from '../JaguarLandRover/ServiceTypes'

interface AuthenticationService {
    /**
     * Initial user authentication requires you to pass your username (email address) and
     * password as well as specifying the appropriate grant type. The server will return with an
     * access token, authorization token, expiration timer, refresh token and a token type
     * indicator.
     *
     * The access token is used for the actual bearer authentication. It's unclear what the
     * purpose of the refresh token and authorization token is at this point but it must be
     * included in the body when registering a device.
     *
     * Note that the Basic auth password must be included. It's a hard coded value that
     * seemingly serves no real purpose other than to satisfy some arbitrary requirement.
     *
     * The access token must be included in all subsequent requests as the `Authorization`
     * bearer in the HTTP header.
     * 
     * @param deviceId UUID4 Device Identifier
     * @param username Username for the JLR Remote App
     * @param password Password for the JLR Remote App
     */
    authenticate: (deviceId: string, username: string, password: string) => Promise<Auth>

    /**
     * Using a refresh token before the access token expiration it is possible to request new
     * tokens without having to submit username and password.
     *
     * Note that after refreshing the access token you will have to perform device registration
     * and user login again.
     * 
     * @param deviceId UUID4 Device Identifier
     * @param refreshToken Refresh Token
     */
    refreshToken: (deviceId: string, refreshToken: string) => Promise<RefreshTokenResponse>

    /**
     * After a succesful user authentication it is neccessary to register a device. A device
     * is simply a UUID4 value that is designated the deviceID. Once the device Id is
     * registered, both the device ID and the access token need to be supplied when accessing
     * the vehicle service.
     * 
     * The server should return 204, and hence, an empty body, if the request was accepted.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param authorizationToken Authorization Token
     * @param expiresIn Expires In
     * @param username Username for the JLR Remote App
     */
    registerDevice: (accessToken: string, deviceId: string, authorizationToken: string, expiresIn: string, username: string) => Promise<boolean>

    /**
     * After successful user authentication and device id registration, we need to log in the
     * user name and retrieve the user ID. The user ID is required for many vehicle related API
     * functions.
     * 
     * The server will return user information upon a successful login request.
     * 
     * @param accessToken Access Token 
     * @param deviceId UUID4 Device Identifier
     */
    loginUser: (accessToken: string, deviceId: string, username: string) => Promise<LoginUserResponse>
}

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
        const response = await axios.post(`${baseUrls.IFOP_BASE_URL}/users/${username}/clients`, data, { headers })

        return response.status === 204
    },

    loginUser: async (accessToken: string, deviceId: string, username: string): Promise<LoginUserResponse> => {
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.User-v3+json' })
        const response = await axios.get(`${baseUrls.IF9_BASE_URL}/users?loginName=${username}`, { headers })

        return response.data
    }
}

export { AuthenticationService, authenticationService }
