import axios from 'axios'
import { baseUrls, getHeaders } from './ServiceHelpers'
import { ServiceStatus, ServiceError, RepeatSchedule } from './ServiceTypes'

const baseUrl = baseUrls.IF9_BASE_URL

/**
 * Sends Electric Vehicle-specific Commands
 */
interface CommandElectricVehicleService {
    /**
     * Start the climate preconditioning at the specified tempareture. Note the absense of the
     * decimal sign. 210 equals 21.0C.
     * 
     * For the LO setting you would pass 155 and for the HI setting you would pass 285.
     * 
     * This operation requires a valid ECC service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     * @param targetTemperatureCelcius Target Temperature in Degrees Celcius
     */
    startClimatePrecdonditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string, targetTemperatureCelcius?: number) => Promise<ServiceStatus | ServiceError>

    /**
     * Stop the climate preconditioning immediately.
     * 
     * This operation requires a valid ECC service authentication token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     */
    stopClimatePreconditioning: (accessToken: string, deviceId: string, vin: string, eccToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Start charging the EV. Requires a valid cp service token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     */
    startCharging: (accessToken: string, deviceId: string, vin: string, cpToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Stop charging the EV. Requires a valid cp service token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     */
    stopCharging: (accessToken: string, deviceId: string, vin: string, cpToken: string) => Promise<ServiceStatus | ServiceError>

    /**
     * Set the maximum state of charge. This requires a valid CP authentication token. The
     * vehicle will never charge more than the specified charge level (in percentage)
     * 
     * Note, this is not a feature the official mobile app exposes to the user.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param maxStateOfCharge Maximum State of Charge (0-100%)
     */
    setMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number) => Promise<ServiceStatus | ServiceError>

    /**
     * Set the one-off maximum state of charge. This requires a valid CP authentication token.
     * The vehicle will never charge more than the specified charge level (in percentage) for
     * the current charging session. Will presumably reset to whatever was the previous value
     * the next time the vehicle is connected to a charger.
     * 
     * Note, this is not a feature the official mobile app exposes to the user.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param maxStateOfCharge Maximum State of Charge (0-100%)
     */
    setOneOfMaxStateOfCharge: (accessToken: string, deviceId: string, vin: string, cpToken: string, maxStateOfCharge: number) => Promise<ServiceStatus | ServiceError>

    /**
     * Add a single departure timer for the specified vehicle. You need to pass a year, month,
     * day, hour and minute in order to specify the departure time. A valid CP service token is
     * required.
     * 
     * The departure timer is seemingly identifier by its numerical index value. A unique index
     * timer value must be specified when creating the departure timer.
     * 
     * Note that if you use an index value that already exist the old departure timer will be
     * overwritten with the new one.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param departureTime Departure Date and Time
     */
    addDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date) => Promise<ServiceStatus | ServiceError>

    /**
     * Add repeated departure timer for the specified vehicle. You need to pass a year, month,
     * day, hour and minute in order to specify the departure time. Additionally, you need to
     * specify which weekdays the departure timer should be active for. A valid CP service token
     * is required.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param departureTime Departure Time
     * @param repeatSchedule Departure Day Schedule
     */
    addRepeatedDepartureTimer: (accessToken: string, deviceId: string, vin: string, cpToken: string, departureTime: Date, repeatSchedule: RepeatSchedule) => Promise<ServiceStatus | ServiceError>

    /**
     * Delete departure timers specified by their index. Requires a valid CP service
     * authentication token.
     * 
     * You can list multiple departure timers to be deleted.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param timerIndex Index of the Timer to Delete
     */
    deleteDepartureTimers: (accessToken: string, deviceId: string, vin: string, cpToken: string, timerIndex: number) => Promise<ServiceStatus | ServiceError>

    /**
     * Set a time period for charging. The vehicle will prioritize charging during the specified
     * period.
     * 
     * It's a bit unclear how this part of the API actually works. Specifying a charging period
     * from 01:00 to 08:30 results in three `TARIFF_ZONE` entries with different `bandType`
     * values and end times, 00:00, 01:00 and 08:30.
     * 
     * Requires a valid CP service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param cpToken CP Token
     * @param startCharging Time to Start Charging
     * @param stopCharging Time to Stop Charging
     * @param repeatSchedule Charging Schedule
     */
    addChargingPeriod: (accessToken: string, deviceId: string, vin: string, cpToken: string, startCharging: Date, stopCharging: Date, repeatSchedule: RepeatSchedule) => Promise<ServiceStatus | ServiceError>

    /**
     * Prioritize climate controls for either range or comfort.
     * 
     * You can pass either `PRIORITIZE_RANGE`or `PRIORITIZE_COMFORT` in the `serviceParameter`
     * value field to prioritize either range or comfort.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param eccToken ECC Token
     * @param priority `PRIORITIZE_RANGE` or `PRIORITIZE_COMFORT`
     */
    setPriority: (accessToken: string, deviceId: string, vin: string, eccToken: string, priority: 'PRIORITIZE_RANGE' | 'PRIORITIZE_COMFORT') => Promise<ServiceStatus | ServiceError>

    /**
     * The vehicle will enter a sleep mode after four days of inactivity. In order to use remote
     * control features after this time a wake up timer is required.
     * 
     * By adding a wake up timer for a specific time before the vehicle enters sleep mode you
     * can ensure that the vehicle is available for remote control for a period of time after
     * the specified wake up time.
     * 
     * This request requires a valid swu service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param swuToken SWU Token
     * @param wakeupTime Wakeup Date and Time
     */
    addWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string, wakeupTime: Date) => Promise<ServiceStatus | ServiceError>

    /**
     * Cancel the wakeup timer.
     * 
     * This request requires a valid swu service auth token.
     * 
     * @param accessToken Access Token
     * @param deviceId UUID4 Device Identifier
     * @param vin Vehicle Identification Number
     * @param swuToken SWU Token
     */
    stopWakeupTime: (accessToken: string, deviceId: string, vin: string, swuToken: string) => Promise<ServiceStatus | ServiceError>
}

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

    deleteDepartureTimers: async (accessToken: string, deviceId: string, vin: string, cpToken: string, timerIndex: number): Promise<ServiceStatus | ServiceError> => {
        const command = { token: cpToken, departureTimerSetting: { timers: [{ timerIndex }] } }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    addChargingPeriod: async (accessToken: string, deviceId: string, vin: string, cpToken: string, startCharging: Date, stopCharging: Date, repeatSchedule: RepeatSchedule): Promise<ServiceStatus | ServiceError> => {
        const command = {
            token: cpToken,
            tariffSettings: {
                tariffs: [
                    {
                        tariffIndex: 0,
                        tariffDefinition: {
                            enabled: true,
                            repeatSchedule,
                            tariffZone: [
                                {
                                    zoneName: 'TARIFF_ZONE_A',
                                    bandType: 'OFFPEAK',
                                    endTime: {
                                        hour: startCharging.getHours(),
                                        minute: startCharging.getMinutes()
                                    }
                                },
                                {
                                    zoneName: 'TARIFF_ZONE_B',
                                    bandType: 'PEAK',
                                    endTime: {
                                        hour: stopCharging.getHours(),
                                        minute: stopCharging.getMinutes()
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/chargeProfile`, command, { headers })

        return response.data
    },

    setPriority: async (accessToken: string, deviceId: string, vin: string, eccToken: string, priority: 'PRIORITIZE_RANGE' | 'PRIORITIZE_COMFORT'): Promise<ServiceStatus | ServiceError> => {
        const command = { token: eccToken, serviceParameters: [{ key: 'PRIORITY_SETTING', value: priority }] }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v5+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.PhevService-v1+json; charset=utf' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/preconditioning`, command, { headers })

        return response.data
    },

    addWakeupTime: async (accessToken: string, deviceId: string, vin: string, swuToken: string, wakeupTime: Date): Promise<ServiceStatus | ServiceError> => {
        const command = { serviceCommand: 'START', startTime: +wakeupTime / 1000, token: swuToken }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v3+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/swu`, command, { headers })

        return response.data
    },

    stopWakeupTime: async (accessToken: string, deviceId: string, vin: string, swuToken: string): Promise<ServiceStatus | ServiceError> => {
        const command = { serviceCommand: 'END', token: swuToken }
        const headers = getHeaders(accessToken, deviceId, { 'Accept': 'application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v3+json', 'Content-Type': 'application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json; charset=utf-8' })
        const response = await axios.post(`${baseUrl}/vehicles/${vin}/swu`, command, { headers })

        return response.data
    }
}

export { CommandElectricVehicleService, commandElectricVehicleService }
