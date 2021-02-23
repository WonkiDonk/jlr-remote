import { Auth, LoginUserResponse, RefreshTokenResponse, UserInfo } from "../Services/ServiceTypes";

export interface AuthenticationService {
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

export interface CommandToken { 
    token: string
}

export interface CommandAuthenticationService {
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
