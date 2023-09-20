import { authenticationService } from '../Authentication/AuthenticationService'
import { queryUserInformationService } from '../Services/QueryUserInformationService'
import { queryVehicleInformationService } from '../Services/QueryVehicleInformationService'
import { JlrRemoteAuthenticationCache } from './JlrVehicleRemoteAuthenticationCache'
import { JlrVehicleRemoteAuthenticator } from './JlrVehicleRemoteAuthenticator'
import { JlrVehicleRemoteBuilder } from './JlrVehicleRemoteBuilder'
import { Vehicle, VehicleGarage, VehicleRemote, VehicleRemoteAuthenticator, VehicleRemoteBuilder} from './Types'

type JlrVehicleGarageConfig = {
    deviceId: string,
    password: string,
    userId: string,
    userName: string,
    userPin: string,
}

class JlrVehicleGarage implements VehicleGarage {
    private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator 
    private readonly vehicleRemoteBuilder: VehicleRemoteBuilder
    private readonly vehicles: Map<string, Vehicle> = new Map<string, Vehicle>()
    
    constructor(private readonly config: JlrVehicleGarageConfig) {
        this.vehicleRemoteAuthenticator = new JlrVehicleRemoteAuthenticator(
            config.deviceId,
            config.userName,
            config.password,
            authenticationService,
            new JlrRemoteAuthenticationCache())
        this.vehicleRemoteBuilder = new JlrVehicleRemoteBuilder()
    }

    getVehicles = async (): Promise<Vehicle[]> => {
        this.vehicles.clear()

        const accessToken = await this.vehicleRemoteAuthenticator.getAccessToken()
        const userVehicles = await queryUserInformationService.getVehiclesForUser(accessToken, this.config.deviceId, this.config.userId)

        for (const vehicle of userVehicles.vehicles) {
            const vehicleAttributes = await queryVehicleInformationService.getVehicleAttributes(accessToken, this.config.deviceId, vehicle.vin)

            this.vehicles.set(vehicle.vin, {
                nickname: vehicleAttributes.nickname,
                registrationNumber: vehicleAttributes.registrationNumber,
                vin: vehicle.vin,
                type: vehicleAttributes.fuelType === 'Electric'
                    ? 'EV'
                    : 'ICE'
            })
        }

        return Array.from(this.vehicles.values())
    }

    getRemoteForVehicle = async (vin: string): Promise<VehicleRemote> => {
        if (this.vehicles.size === 0)
            await this.getVehicles()

        if (this.vehicles.has(vin))
            throw new Error(`Vehicle with VIN ${vin} is not found.`)

        return this.vehicleRemoteBuilder.build(vin, this.vehicles.get(vin)!.type)
    }
}

export { JlrVehicleGarageConfig, JlrVehicleGarage }
