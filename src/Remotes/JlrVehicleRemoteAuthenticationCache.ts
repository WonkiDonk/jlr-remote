import { VehicleRemoteAuthenticationCache, CachedAuthentication } from "./Types";

class JlrRemoteAuthenticationCache implements VehicleRemoteAuthenticationCache {
    private timerId?: NodeJS.Timeout
    private accessToken?: string

    cacheAuthentication = (accessToken: string, expiresIn: number): void => {
        if (!Number.isNaN(expiresIn) && expiresIn > 0) {
            clearTimeout(this.timerId)
            
            this.accessToken = accessToken
            this.timerId = setTimeout(() => this.accessToken = undefined, expiresIn * 1000)
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
