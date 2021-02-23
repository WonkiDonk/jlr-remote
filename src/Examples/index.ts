import * as jlr_remote from '../index'

type Car = {
    nickname: string,
    registrationNumber: string,
    vin: string
}

const getListOfCarsForUser = async (deviceId: string, username: string, password: string): Promise<Car[]> => {
    // Authenticate
    const {access_token, authorization_token, expires_in } = await jlr_remote.authenticationService.authenticate(deviceId, username, password)

    // Register the application as a device
    await jlr_remote.authenticationService.registerDevice(access_token, deviceId, authorization_token, expires_in, username)

    // Login the user
    const { userId } = await jlr_remote.authenticationService.loginUser(access_token, deviceId, username)

    // Get a list of vehicles on the account
    const userVehicles = await jlr_remote.queryUserInformationService.getVehiclesForUser(access_token, deviceId, userId)
    
    let cars: Car[] = []

    for (const vehicle of userVehicles.vehicles) {
        const vehicleAttributes = await jlr_remote.queryVehicleInformationService.getVehicleAttributes(access_token, deviceId, vehicle.vin)
        cars = [...cars, {
            nickname: vehicleAttributes.nickname,
            registrationNumber: vehicleAttributes.registrationNumber,
            vin: vehicle.vin
        }]
    }

    return cars
}

export default {getListOfCarsForUser}