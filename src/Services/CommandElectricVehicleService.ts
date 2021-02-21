import axios from 'axios'
import { baseUrls, getHeaders } from './ServiceHelpers'
import { CommandElectricVehicleService } from './Services'
import { ServiceStatus, ServiceError, RepeatSchedule } from './ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL

const commandElectricVehicleService: CommandElectricVehicleService = {
    startClimatePrecdonditioning: async (accessToken: string, deviceId: string, vin: string, eccToken: string, targetTemperatureCelcius: number = 210): Promise<ServiceStatus | ServiceError> => {
        const command = { token: eccToken, serviceParameters: [{ key: 'PRECONDITIONING', value: 'START' }, { key: 'TARGET_TEMPERATURE_CELSIUS', value: targetTemperatureCelcius }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/preconditioning`, command, { headers })

        return response.data
    },

    stopClimatePreconditioning: async (accessToken: string, deviceId: string, vin: string, eccToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: eccToken, serviceParameters: [{ 'key': 'PRECONDITIONING', 'value': 'STOP' }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/preconditioning`, command, { headers })

        return response.data
    },

    startCharging: async (accessToken: string, deviceId: string, vin: string, cpToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: cpToken, serviceParameters: [{ key: 'CHARGE_NOW_SETTING', value: 'FORCE_ON' }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    stopCharging: async (accessToken: string, deviceId: string, vin: string, cpToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { token: cpToken, serviceParameters: [{ key: 'CHARGE_NOW_SETTING', value: 'FORCE_OFF' }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    setMaxStateOfCharge: async (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number): Promise<ServiceStatus | ServiceError> => {
        const command = { token: cpToken, serviceParameters: [{ key: 'SET_PERMANENT_MAX_SOC', value: maxStateOfCharge }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    setOneOfMaxStateOfCharge: async (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number): Promise<ServiceStatus | ServiceError> => {
        const command = { token: cpToken, serviceParameters: [{ key: 'SET_ONE_OFF_MAX_SOC', value: maxStateOfCharge }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    addDepartureTimer: async (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date): Promise<ServiceStatus | ServiceError> => {
        const command = {
            token: cpToken,
            departureTimerSetting: {
                timers: [
                    {
                        departureTime: {
                            hour: departureTime.getHours(),
                            minute: departureTime.getMinutes()
                        },
                        timerIndex: 50,
                        timerTarget: {
                            singleDay: {
                                day: departureTime.getDate(),
                                month: departureTime.getMonth() + 1,
                                year: departureTime.getFullYear()
                            }
                        },
                        timerType: { key: 'BOTHCHARGEANDPRECONDITION', value: true }
                    }
                ]
            }
        }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    addRepeatedDepartureTimer: async (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date, repeatSchedule: RepeatSchedule): Promise<ServiceStatus | ServiceError> => {
        const command = {
            token: cpToken,
            departureTimerSetting: {
                timers: [
                    {
                        departureTime: {
                            hour: departureTime.getHours(),
                            minute: departureTime.getMinutes()
                        },
                        timerIndex: 50,
                        timerTarget: { repeatSchedule },
                        timerType: { key: 'BOTHCHARGEANDPRECONDITION', value: true }
                    }
                ]
            }
        }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    deleteDepartureTimers: (accessToken: string, deviceId: string, vin: string, cpToken: string, timerIndex: number): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    setPriority: (accessToken: string, deviceId: string, vin: string, eccToken: string, priority: 'PRIORITIZE_RANGE' | 'PRIORITIZE_COMFORT'): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    addWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string, wakeupTime: Date): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') },

    stopWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string): Promise<ServiceStatus | ServiceError> => { throw new Error('Not implemented') }
}

export default commandElectricVehicleService
