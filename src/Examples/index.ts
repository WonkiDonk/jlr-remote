import { Vehicle, JlrVehicleGarage } from '../index'

const getElectricVehicles = async (deviceId: string, userName: string, password: string): Promise<Vehicle[]> => {
    const garage = new JlrVehicleGarage({
        deviceId,
        userName,
        password,
        userId: '',
        userPin: ''
    })
    
    const vehicles = await garage.getVehicles()

    return vehicles.filter(vehicle => vehicle.type === 'EV')
}

const getBatteryChargeLevel = async (deviceId: string, userName: string, password: string, vin: string): Promise<number | undefined> => {
    const garage = new JlrVehicleGarage({
        deviceId,
        userName,
        password,
        userId: '',
        userPin: ''
    })

    const remote = await garage.getRemoteForVehicle(vin)
    if (remote.type === 'EV')
    {
        const chargeState = await remote.getChargeState()

        return chargeState.chargeLevel
    }

    return undefined
}

const preconditionEV = async (deviceId: string, userName: string, password: string, vin: string, targetTemperature: number): Promise<void> => {
    const garage = new JlrVehicleGarage({
        deviceId,
        userName,
        password,
        userId: '',
        userPin: ''
    })

    const remote = await garage.getRemoteForVehicle(vin)

    await remote.turnOnClimateControl(targetTemperature)
}

const lockCar = async (deviceId: string, userName: string, password: string, vin: string, userPin: string): Promise<void> => {
    const garage = new JlrVehicleGarage({
        deviceId,
        userName,
        password,
        userId: '',
        userPin
    })

    const remote = await garage.getRemoteForVehicle(vin)
    
    await remote.lock()
}

const preconditionIceCar = async (deviceId: string, userName: string, password: string, vin: string, userPin: string, targetTemperature: number): Promise<void> => {
    const garage = new JlrVehicleGarage({
        deviceId,
        userName,
        password,
        userId: '',
        userPin
    })

    const remote = await garage.getRemoteForVehicle(vin)

    await remote.turnOnClimateControl(targetTemperature)
}

export default { getElectricVehicles, getBatteryChargeLevel, preconditionEV, lockCar, preconditionIceCar }