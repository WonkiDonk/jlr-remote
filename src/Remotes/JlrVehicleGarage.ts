import { authenticationService } from '../Authentication/AuthenticationService'
import { commandAuthenticationService } from '../Authentication/CommandAuthenticationService'
import { commandElectricVehicleService } from '../Services/CommandElectricVehicleService'
import { commandIceVehicleService } from '../Services/CommandIceVehicleService'
import { commandVehicleService } from '../Services/CommandVehicleService'
import { queryUserInformationService } from '../Services/QueryUserInformationService'
import { queryVehicleInformationService } from '../Services/QueryVehicleInformationService'
import { JlrVehicleRemoteAuthenticationCache } from './JlrVehicleRemoteAuthenticationCache'
import { JlrVehicleRemoteAuthenticator } from './JlrVehicleRemoteAuthenticator'
import { JlrVehicleRemoteBuilder } from './JlrVehicleRemoteBuilder'
import { vehicleStatusMapper } from './Mappers'
import { Vehicle, VehicleGarage, VehicleRemote, VehicleRemoteAuthenticator, VehicleRemoteBuilder } from './Types'

type JlrVehicleGarageConfig = {
    deviceId: string,
    password: string,
    userName: string,
    userPin: string,
}

class JlrVehicleGarage implements VehicleGarage {
    private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator
    private vehicleRemoteBuilder?: VehicleRemoteBuilder
    private readonly vehicles: Map<string, Vehicle> = new Map<string, Vehicle>()

    constructor(private readonly config: JlrVehicleGarageConfig) {
        this.vehicleRemoteAuthenticator = new JlrVehicleRemoteAuthenticator(
            config.deviceId,
            config.userName,
            config.password,
            authenticationService,
            new JlrVehicleRemoteAuthenticationCache()
        )
    }

    private getOrCreateVehicleRemoteBuilder = async (): Promise<VehicleRemoteBuilder> => {
        if (this.vehicleRemoteBuilder) {
            return this.vehicleRemoteBuilder;
        }

        const authDetails = await this.vehicleRemoteAuthenticator.authenticateAndGetDetails();

        this.vehicleRemoteBuilder = new JlrVehicleRemoteBuilder(
            this.config.deviceId,
            authDetails.userId,
            this.config.userPin,
            this.vehicleRemoteAuthenticator,
            commandVehicleService,
            commandElectricVehicleService,
            commandIceVehicleService,
            commandAuthenticationService,
            queryVehicleInformationService,
            vehicleStatusMapper
        );
        return this.vehicleRemoteBuilder;
    }

    getVehicles = async (): Promise<Vehicle[]> => {
        this.vehicles.clear()

        const authDetails = await this.vehicleRemoteAuthenticator.authenticateAndGetDetails();
        const userVehicles = await queryUserInformationService.getVehiclesForUser(authDetails.accessToken, this.config.deviceId, authDetails.userId);

        for (const vehicle of userVehicles.vehicles) {
            const vehicleAttributes = await queryVehicleInformationService.getVehicleAttributes(authDetails.accessToken, this.config.deviceId, vehicle.vin);

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

        if (!this.vehicles.has(vin)) // Corrected logic: throw if vehicle NOT found
            throw new Error(`Vehicle with VIN ${vin} is not found.`)

        const builder = await this.getOrCreateVehicleRemoteBuilder();
        return builder.build(vin, this.vehicles.get(vin)!.type)
    }
}

export { JlrVehicleGarageConfig, JlrVehicleGarage }
