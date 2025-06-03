import { AuthenticationResult, CachedAuthentication, ValidAuthentication, VehicleRemoteAuthenticationCache } from "./Types";

class JlrVehicleRemoteAuthenticationCache implements VehicleRemoteAuthenticationCache {
    private timerId?: NodeJS.Timeout
    private authenticationResult?: AuthenticationResult

    private clearCache = () => this.authenticationResult = undefined
    private isValidExpiration = (expiresIn: number) => !Number.isNaN(expiresIn) && expiresIn > 0

    cacheAuthentication = (details: AuthenticationResult, expiresIn: number): void => {
        if (this.isValidExpiration(expiresIn)) {
            clearTimeout(this.timerId)
            
            this.authenticationResult = details
            this.timerId = setTimeout(this.clearCache, expiresIn * 1000)
        }
    }

    getCachedAuthentication = (): CachedAuthentication => {
        const isExpired = this.authenticationResult === undefined

        return isExpired
            ? { isExpired: true }
            : { isExpired: false, details: this.authenticationResult! }
    }
}

export { JlrVehicleRemoteAuthenticationCache }
