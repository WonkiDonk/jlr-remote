import { CommandAuthenticationService } from "../Authentication/CommandAuthenticationService";
import { CommandElectricVehicleService } from "../Services/CommandElectricVehicleService";
import { CommandIceVehicleService } from "../Services/CommandIceVehicleService";
import { CommandVehicleService } from "../Services/CommandVehicleService";
import { QueryVehicleInformationService } from "../Services/QueryVehicleInformationService";
import { JlrElectricVehicleRemoteControl } from "./JlrElectricVehicleRemoteControl";
import { JlrInternalCombustionEngineVehicleRemoteControl } from "./JlrInternalCombustionEngineVehicleRemoteControl";
import { JlrVehicleRemoteControl } from "./JlrVehicleRemoteControl";
import { JlrVehicleRemoteInformation } from "./JlrVehicleRemoteInformation";
import { VehicleStatusMapper } from "./Mappers";
import {
    ElectricVehicleRemote,
    ElectricVehicleRemoteControl,
    InternalCombustionEngineVehicleRemote,
    InternalCombustionEngineVehicleRemoteControl,
    VehicleRemote,
    VehicleRemoteAuthenticator,
    VehicleRemoteBuilder,
    VehicleRemoteControl,
    VehicleRemoteInformation,
    VehicleType
} from "./Types";

type Builder = (vin: string) => any

class JlrVehicleRemoteBuilder implements VehicleRemoteBuilder {
    constructor(
        private readonly deviceId: string,
        private readonly userId: string,
        private readonly userPin: string,
        private readonly vehicleRemoteAuthenticator: VehicleRemoteAuthenticator,
        private readonly commandVehicleService: CommandVehicleService,
        private readonly commandElectricVehicleService: CommandElectricVehicleService,
        private readonly commandIceVehicleService: CommandIceVehicleService,
        private readonly commandAuthenticationService: CommandAuthenticationService,
        private readonly queryVehicleInformationService: QueryVehicleInformationService,
        private readonly vehicleStatusMapper: VehicleStatusMapper
    ) { }

    private getLastFourOfVin = (vin: string): string => vin.slice(vin.length - 4)

    private buildElectricVehicleRemoteControl = (vin: string): ElectricVehicleRemoteControl =>
        new JlrElectricVehicleRemoteControl(
            this.deviceId,
            vin,
            this.userId,
            this.getLastFourOfVin(vin),
            this.vehicleRemoteAuthenticator,
            this.commandElectricVehicleService,
            this.commandAuthenticationService,
            this.queryVehicleInformationService,
            this.vehicleStatusMapper
        )

    private buildInternalCombustionEngineVehicleRemoteControl = (vin: string): InternalCombustionEngineVehicleRemoteControl =>
        new JlrInternalCombustionEngineVehicleRemoteControl(
            this.deviceId,
            vin,
            this.userId,
            this.userPin,
            this.vehicleRemoteAuthenticator,
            this.commandIceVehicleService,
            this.commandAuthenticationService,
            this.queryVehicleInformationService,
            this.vehicleStatusMapper
        )

    private buildVehicleRemoteControl = (vin: string): VehicleRemoteControl =>
        new JlrVehicleRemoteControl(
            this.deviceId,
            vin,
            this.userId,
            this.getLastFourOfVin(vin),
            this.userPin,
            this.vehicleRemoteAuthenticator,
            this.commandAuthenticationService,
            this.commandVehicleService,
            this.queryVehicleInformationService,
            this.vehicleStatusMapper
        )

    private buildVehicleRemoteInformation = (vin: string): VehicleRemoteInformation =>
        new JlrVehicleRemoteInformation(
            this.deviceId,
            vin,
            this.vehicleRemoteAuthenticator,
            this.queryVehicleInformationService,
            this.vehicleStatusMapper
        )

    private buildFrom<T>(vin: string, ...builders: Builder[]): T {
        let construct = {}

        builders.forEach(builder => {
            const remote = builder(vin)
            construct = { ...construct, remote }
        })

        return construct as T
    }

    private buildElectricVehicleRemote = (vin: string): ElectricVehicleRemote =>
        this.buildFrom(
            vin,
            this.buildVehicleRemoteInformation,
            this.buildVehicleRemoteControl,
            this.buildElectricVehicleRemoteControl
        )

    private buildInternalCombustionEngineVehicleRemote = (vin: string): InternalCombustionEngineVehicleRemote =>
        this.buildFrom(
            vin,
            this.buildVehicleRemoteInformation,
            this.buildVehicleRemoteControl,
            this.buildInternalCombustionEngineVehicleRemoteControl
        )

    build = (vin: string, type: VehicleType): VehicleRemote =>
        type === 'EV'
            ? this.buildElectricVehicleRemote(vin)
            : this.buildInternalCombustionEngineVehicleRemote(vin)

}

export { JlrVehicleRemoteBuilder }
