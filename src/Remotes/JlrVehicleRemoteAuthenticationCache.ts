import { VehicleRemoteAuthenticationCache, CachedAuthentication } from "./Types";

class JlrRemoteAuthenticationCache implements VehicleRemoteAuthenticationCache {
    private timerId?: NodeJS.Timeout

    cacheAuthentication = (accessToken: string, expiresIn: number): void => {
        clearTimeout(this.timerId)
        this.timerId = setTimeout(() => { }, expiresIn * 1000)
    }

    getCachedAuthentication = (): CachedAuthentication => {
        return {
            isExpired: true
        }
    }
}

export { JlrRemoteAuthenticationCache }
