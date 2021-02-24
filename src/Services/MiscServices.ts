import { MiscServices } from "./Services";
import { ReverseGeocode } from "./ServiceTypes";

const miscServices: MiscServices = {
    getReverseGeocode: async (accessToken: string, latitude: number, longitude: number): Promise<ReverseGeocode> => {
        throw new Error('Not implemented')
    }
}

export default miscServices
