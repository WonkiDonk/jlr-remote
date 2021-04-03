interface VehicleRemoteAuthenticator {
    getAccessToken: () => Promise<string>
}

export { VehicleRemoteAuthenticator }