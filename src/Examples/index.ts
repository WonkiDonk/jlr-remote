import * as jlr_remote from '../index'

type Car = {
    nickname: string,
    registrationNumber: string,
    vin: string
}

const getElectricVehicles = async (deviceId: string, username: string, password: string): Promise<Car[]> => {
    // Authenticate
    const { access_token, authorization_token, expires_in } = await jlr_remote.authenticationService.authenticate(deviceId, username, password)

    // Register the application as a device
    await jlr_remote.authenticationService.registerDevice(access_token, deviceId, authorization_token, expires_in, username)

    // Login the user
    const { userId } = await jlr_remote.authenticationService.loginUser(access_token, deviceId, username)

    // Get a list of vehicles on the account
    const userVehicles = await jlr_remote.queryUserInformationService.getVehiclesForUser(access_token, deviceId, userId)

    let electricCars: Car[] = []

    for (const vehicle of userVehicles.vehicles) {
        const vehicleAttributes = await jlr_remote.queryVehicleInformationService.getVehicleAttributes(access_token, deviceId, vehicle.vin)

        if (vehicleAttributes.fuelType === 'Electric') {
            electricCars = [...electricCars, {
                nickname: vehicleAttributes.nickname,
                registrationNumber: vehicleAttributes.registrationNumber,
                vin: vehicle.vin
            }]
        }
    }

    return electricCars
}

const getBatteryChargeLevel = async (deviceId: string, username: string, password: string, vin: string): Promise<number | null> => {
    // Authenticate
    const { access_token, authorization_token, expires_in } = await jlr_remote.authenticationService.authenticate(deviceId, username, password)

    // Register the application as a device
    await jlr_remote.authenticationService.registerDevice(access_token, deviceId, authorization_token, expires_in, username)

    // Login the user
    await jlr_remote.authenticationService.loginUser(access_token, deviceId, username)

    const currentVehicleStatus = await jlr_remote.queryVehicleInformationService.getVehicleStatusV3(access_token, deviceId, vin)
    const stateOfCharge = currentVehicleStatus.vehicleStatus?.evStatus.find(status => status.key === 'EV_STATE_OF_CHARGE')

    return stateOfCharge?.value
        ? +(stateOfCharge.value)
        : null
}

const preconditionCar = async (deviceId: string, username: string, password: string, vin: string): Promise<void> => {
    // Authenticate
    const { access_token, authorization_token, expires_in } = await jlr_remote.authenticationService.authenticate(deviceId, username, password)

    // Register the application as a device
    await jlr_remote.authenticationService.registerDevice(access_token, deviceId, authorization_token, expires_in, username)

    // Login the user
    const { userId } = await jlr_remote.authenticationService.loginUser(access_token, deviceId, username)

    // Get command token (startClimatePreconditioning requires ECC token)
    const { token } = await jlr_remote.commandAuthenticationService.getEccToken(access_token, deviceId, vin, userId, vin.slice(vin.length - 4))

    // Send the command to start the preconditioning at 21.0 degrees C
    await jlr_remote.commandElectricVehicleService.startClimatePrecdonditioning(access_token, deviceId, vin, token, 210)
}

const lockCar = async (deviceId: string, username: string, password: string, vin: string, userPin: string): Promise<void> => {
    // Authenticate
    const { access_token, authorization_token, expires_in } = await jlr_remote.authenticationService.authenticate(deviceId, username, password)

    // Register the application as a device
    await jlr_remote.authenticationService.registerDevice(access_token, deviceId, authorization_token, expires_in, username)

    // Login the user
    const { userId } = await jlr_remote.authenticationService.loginUser(access_token, deviceId, username)

    // Get command token (lock requires RDL token)
    const { token } = await jlr_remote.commandAuthenticationService.getRdlToken(access_token, deviceId, vin, userId, userPin)

    // Send the command to lock the car.
    await jlr_remote.commandVehicleService.lockVehicle(access_token, deviceId, vin, token)
}

export default { getElectricVehicles, getBatteryChargeLevel, preconditionCar, lockCar }