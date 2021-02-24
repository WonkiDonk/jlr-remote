import axios from "axios";
import { baseUrls, getHeaders } from "../JaguarLandRover/ServiceHelpers";
import { ReverseGeocode } from "../JaguarLandRover/ServiceTypes";

/**
 * Miscellanous Services
 */
interface MiscServices {
    /**
     * Lookup a lat/long combination and get address information associated with the supplied
     * coordinates.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param latitude Latitude
     * @param longitude Longitude
     */
    getReverseGeocode: (accessToken: string, deviceId: string, latitude: number, longitude: number) => Promise<ReverseGeocode>
}

const miscServices: MiscServices = {
    getReverseGeocode: async (accessToken: string, deviceId: string, latitude: number, longitude: number): Promise<ReverseGeocode> => {
        const headers = getHeaders(accessToken, deviceId)
        const response = await axios.get<ReverseGeocode>(`${baseUrls.IF9_BASE_URL}/geocode/reverse/${latitude}/${longitude}/en`, { headers })

        return response.data
    }
}

export { MiscServices, miscServices }
