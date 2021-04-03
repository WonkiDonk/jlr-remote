import { InternalCombustionEngineVehicleRemoteControl } from './Types'

class JlrInternalCombustionEngineVehicleRemoteControl implements InternalCombustionEngineVehicleRemoteControl {
    public type: 'ICE' = 'ICE'

    turnOnClimateControl = (targetTemperature: number): Promise<void> => {
		throw new Error('Not implemented.')
    }

    turnOffClimateControl = (): Promise<void> => {
		throw new Error('Not implemented.')
    }

    isClimateControlOn = (): Promise<boolean> => {
		throw new Error('Not implemented.')
    }

    turnOnEngine = (): Promise<void> => {
		throw new Error('Not implemented.')
    }

    turnOffEngine = (): Promise<void> => {
		throw new Error('Not implemented.')
    }

    isEngineOn = (): Promise<boolean> => {
		throw new Error('Not implemented.')
    }
}

export { JlrInternalCombustionEngineVehicleRemoteControl }
