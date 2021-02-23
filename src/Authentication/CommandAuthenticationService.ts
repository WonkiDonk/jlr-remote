import { AuthenticateALOFF, AuthenticateCP, AuthenticateECC, AuthenticateHBLF, AuthenticatePROV, AuthenticateRDL, AuthenticateRDU, AuthenticateSWU, AuthenticateVHS } from '../Services/ServiceTypes'
import {CommandAuthenticationService} from './Services'

const commandAuthenticationService: CommandAuthenticationService = {
    getAloffToken: async (accessToken: string, deviceId: string, vin: string, userPin: string): Promise<AuthenticateALOFF> => { throw new Error('Not implemented') },

    getCpToken: async (accessToken: string, deviceId: string, vin: string, lastFourOfVin: string): Promise<AuthenticateCP> => { throw new Error('Not implemented') },

    getEccToken: async (accessToken: string, deviceId: string, vin: string, lastFourOfVin: string): Promise<AuthenticateECC> => { throw new Error('Not implemented') },

    getHblfToken: async (accessToken: string, deviceId: string, vin: string, lastFourOfVin: string): Promise<AuthenticateHBLF> => { throw new Error('Not implemented') },

    getProvToken: async (accessToken: string, deviceId: string, vin: string, userPin: string): Promise<AuthenticatePROV> => { throw new Error('Not implemented') },

    getRdlToken: async (accessToken: string, deviceId: string, vin: string, userPin: string): Promise<AuthenticateRDL> => { throw new Error('Not implemented') },

    getRduToken: async (accessToken: string, deviceId: string, vin: string, userPin: string): Promise<AuthenticateRDU> => { throw new Error('Not implemented') },

    getSwuToken: async (accessToken: string, deviceId: string, vin: string): Promise<AuthenticateSWU> => { throw new Error('Not implemented') },

    getVhsToken: async (accessToken: string, deviceId: string, vin: string): Promise<AuthenticateVHS> => { throw new Error('Not implemented') },


}

export default commandAuthenticationService