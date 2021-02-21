import { QueryUserInformationService } from "./Services"
import { UserInfo, Vehicles } from "./ServiceTypes"

const queryUserInformationService: QueryUserInformationService = {
    getUserInfoFromID: (accessToken: string, deviceId: string, userId: string): Promise<UserInfo> => { throw new Error('Not implemented') },

    getVehiclesForUser: (accessToken: string, deviceId: string, userId: string): Promise<Vehicles> => { throw new Error('Not implemented') }
}

export default queryUserInformationService
