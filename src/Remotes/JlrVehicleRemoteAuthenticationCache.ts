import { VehicleRemoteAuthenticationCache, CachedAuthentication } from "./Types";

class JlrRemoteAuthenticationCache implements VehicleRemoteAuthenticationCache {
    private timerId?: NodeJS.Timeout
    private accessToken?: string

    private clearCache = () => this.accessToken = undefined
    private isValidExpiration = (expiresIn: number) => !Number.isNaN(expiresIn) && expiresIn > 0

    cacheAuthentication = (accessToken: string, expiresIn: number): void => {
        if (this.isValidExpiration(expiresIn)) {
            clearTimeout(this.timerId)
            
            this.accessToken = accessToken
            this.timerId = setTimeout(this.clearCache, expiresIn * 1000)
        }
    }

    getCachedAuthentication = (): CachedAuthentication => {
        const isExpired = this.accessToken === undefined

        return isExpired
            ? { isExpired: true }
            : { isExpired: false, accessToken: this.accessToken! }
    }
}

export { JlrRemoteAuthenticationCache }
