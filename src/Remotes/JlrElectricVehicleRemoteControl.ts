import { ElectricVehicleRemoteControl, ChargeState } from './Types'

class JlrElectricVehicleRemoteControl implements ElectricVehicleRemoteControl {
    public type: 'EV' = 'EV'

    turnOnClimateControl = (targetTemperature: number): Promise<void> => {
        throw new Error('Not implemented.')
    }

    turnOffClimateControl = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    isClimateControlOn = (): Promise<boolean> => {
        throw new Error('Not implemented.')
    }

    startCharing = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    stopCharging = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    getChargeState = (): Promise<ChargeState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrElectricVehicleRemoteControl }
