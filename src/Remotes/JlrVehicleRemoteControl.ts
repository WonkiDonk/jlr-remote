import { LockState, VehicleRemoteControl } from './Types'

class JlrVehicleRemoteControl implements VehicleRemoteControl {
    beepAndFlash = (): Promise<void> => {
        throw new Error('Not implemented.')
    }

    lock = (): Promise<void> => {
        throw new Error('Not implemented.')
    }
    
    unlock = (): Promise<void> => {
        throw new Error('Not implemented.')
    }
    
    getLockState = (): Promise<LockState> => {
        throw new Error('Not implemented.')
    }
}

export { JlrVehicleRemoteControl }
