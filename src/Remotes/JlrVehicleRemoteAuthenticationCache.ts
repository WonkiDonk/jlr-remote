import { VehicleRemoteAuthenticationCache, CachedAuthentication } from "./Types";

class JlrRemoteAuthenticationCache implements VehicleRemoteAuthenticationCache {
    cacheAuthentication = (accessToken: string, expiresIn: Number): void => {
        throw new Error('Not implemented.')
    }

    getCachedAuthentication = (): CachedAuthentication => {
        throw new Error('Not implemented.')
    }
}

export { JlrRemoteAuthenticationCache }
