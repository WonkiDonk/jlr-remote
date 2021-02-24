import axios from "axios";
import { baseUrls, getHeaders } from "./ServiceHelpers";
import { MiscServices } from "./Services";
import { ReverseGeocode } from "./ServiceTypes";

const miscServices: MiscServices = {
    getReverseGeocode: async (accessToken: string, deviceId: string, latitude: number, longitude: number): Promise<ReverseGeocode> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<ReverseGeocode>(`${baseUrls.IF9_BASE_URL}/geocode/reverse/${latitude}/${longitude}/en`, { headers })

        return response.data
    }
}

export default miscServices
