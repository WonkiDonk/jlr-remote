import { VehicleRemoteAuthenticator } from './Types'

class JlrVehicleRemoteAuthenticator implements VehicleRemoteAuthenticator {
    getAccessToken = (): Promise<string> => {
        throw new Error('Not implemented.')
    }
}

export { JlrVehicleRemoteAuthenticator }
