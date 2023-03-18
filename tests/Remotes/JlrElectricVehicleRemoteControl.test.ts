import { createMock } from 'ts-auto-mock'
import { JlrElectricVehicleRemoteControl } from '../../src/Remotes/JlrElectricVehicleRemoteControl'
import { CommandElectricVehicleService } from "../../src/Services/CommandElectricVehicleService"
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { JlrElectricVehicleRemoteControlBuilder } from './JlrElectricVehicleRemoteControl.builder'


describe('JLR Electric Vehicle Remove Control', () => {
    describe('Start charging', () => {
        test.each(['some token', 'fake token', 'hello world'])
        ('uses access token `%s`', async (expectedAccessToken) => {
            // Arrange
            const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
            mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

            const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

            const builder = new JlrElectricVehicleRemoteControlBuilder()
            builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
            builder.commandElectricVehicleService = mockCommandElectricVehicleService

            const remote = builder.build()

            // Act
            await remote.startCharging()

            // Assert
            expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String),
                expect.any(String))

        })

        test('uses deviceId `%s`', () => {
            
        })

        test('uses vin `%s`', () => {

        })

        describe('Gets cpToken', () => {
            test('uses access token `%s`', () => {})
            test('uses device ID `%s`', () => {})
            test('uses vin `%s`', () => {})
            test('uses user ID `%s`', () => {})
            test('uses last four of vin `%s`', () => {})
            test('uses cpToken `%s`', () => {})

        })   

    })

    describe('Stop charging', () => {
        test('uses access token `%s`', () => {

        })

        test('uses deviceId `%s`', () => {
            
        })

        test('uses vin `%s`', () => {

        })

        describe('Gets cpToken', () => {
            test('uses access token `%s`', () => {})
            test('uses device ID `%s`', () => {})
            test('uses vin `%s`', () => {})
            test('uses user ID `%s`', () => {})
            test('uses last four of vin `%s`', () => {})
            test('uses cpToken `%s`', () => {})

        })   
    })

    describe('Get charge state', () => {
        test.each(['some token', 'another token', 'not a real token'])
            ('uses access token `%s`', async (expectedAccessToken) => {})
        
        test.each(['device id', 'another device id', 'not a real device id'])
            ('uses the device Id `%s`', async (expectedDeviceId) => {})
        
        test.each(['VIN', 'another VIN', 'not a real VIN'])
            ('uses the VIN `%s`', async (expectedVin) => {})

        test.each([
            ['CHARGING', true],
            ['NOT_CHARGING', false],
            ['UNKNOWN', undefined]])
            ('returns expected charging state', async (ev_charging_status, expectedIsCharging) => {})

        test.each([
            ['CONNECTED', true],
            ['NOT_CONNECTED', false],
            ['UNKNOWN', undefined]])
            ('returns expected cable state', async (ev_is_plugged_in, expectedIsConnected) => { })

        test.each([
            ['100', 100],
            ['50', 50],
            ['95', 95],
            ['17', 17],
            ['NaN', undefined]])
            ('returns expected cable state', async (ev_state_of_charge, expectedChargeLevel) => { })
    })
})