import { ServiceError, ServiceStatus } from "./ServiceTypes"

/**
 * Sends Internal Combustion Engine (ICE) Vehicle-specific Commands
 */
interface CommandICEVehicleService {
    /**
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param reonToken REON Token
     */
    remoteEngineStart: (accessToken: string, deviceId: string, vin: string, reonToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param reoffToken REOFF Token
     */
    remoteEngineStop: (accessToken: string, deviceId: string, vin: string, reoffToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param provToken PROV Token
     */
    enableProvisioningMode: (accessToken: string, deviceId: string, vin: string, provToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param targetTemperature Target Temperature
     */
    setRemoteClimateControlTargetTemperature: (accessToken: string, deviceId: string, vin: string, targetTemperature?: number) => Promise<ServiceStatus | ServiceError>
}

export { CommandICEVehicleService }
