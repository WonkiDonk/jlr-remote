import { createMock } from 'ts-auto-mock'
import { CommandElectricVehicleService } from "../../src/Services/CommandElectricVehicleService"
import { VehicleRemoteAuthenticator } from '../../src/Remotes/Types'
import { JlrElectricVehicleRemoteControlBuilder } from './JlrElectricVehicleRemoteControl.builder'
import { CommandAuthenticationService } from '../../src/Authentication/CommandAuthenticationService'
import { JlrElectricVehicleRemoteControl } from '../../src/Remotes/JlrElectricVehicleRemoteControl'


describe('JLR Electric Vehicle Remote Control', () => {
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

        test.each(['hello world', 'fake ID', 'bad ID'])
        ('uses device ID `%s`', async (expectedDeviceId) => {
            // Arrange
            const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

            const builder = new JlrElectricVehicleRemoteControlBuilder()
            builder.deviceId = expectedDeviceId
            builder.commandElectricVehicleService = mockCommandElectricVehicleService

            const remote = builder.build()

            // Act
            await remote.startCharging()

            // Assert
            expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                expect.any(String),
                expectedDeviceId,
                expect.any(String),
                expect.any(String))          
        })

        test.each(['vin1', 'vin2', 'vin3'])
        ('uses vin `%s`', async (expectedVin) => {
            // Arrange
            const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()

            const builder = new JlrElectricVehicleRemoteControlBuilder()
            builder.vin = expectedVin
            builder.commandElectricVehicleService = mockCommandElectricVehicleService

            const remote = builder.build()

            // Act
            await remote.startCharging()

            // Assert
            expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expectedVin,
                expect.any(String))
        })

        describe('Gets cpToken', () => {
            test.each(['real token', 'not a real token', 'garbage'])
            ('uses access token `%s`', async (expectedAccessToken) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
                mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve(expectedAccessToken))

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()


                // Assert
                expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                    expectedAccessToken,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })
                       
            test.each(['some device id', 'not a real device id', 'dani and will pairing innit'])
            ('uses device ID `%s`', async (expectedDeviceId) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.deviceId = expectedDeviceId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()


                // Assert
                expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expectedDeviceId,
                    expect.any(String),
                    expect.any(String),
                    expect.any(String))
            })
                      
            test.each(['hello world', 'Vin Diesel', 'fake VIN'])
            ('uses vin `%s`', async (expectedVin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.vin = expectedVin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expectedVin,
                    expect.any(String),
                    expect.any(String))
            })
            
            test.each(['hello world', 'useless ID','fake ID'])
            ('uses user ID `%s`', async (expectedUserId) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.userId = expectedUserId
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedUserId,
                    expect.any(String))
            })

            test.each (['VIN1234', 'VIN4321', 'VIN1243', 'VIN4312'])
            ('uses last four of vin `%s`', async (expectedLastFourOfVin) => {
                // Arrange
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.lastFourOfVin = expectedLastFourOfVin
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandAuthenticationService.getCpToken).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedLastFourOfVin)
            })
            
            test.each(['cp Token1','cp Token2', 'cp Token3'])
            ('uses cpToken `%s`', async (expectedCpToken) => {
                // Arrange
                const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()
                const mockCommandAuthenticationService = createMock<CommandAuthenticationService>()
                mockCommandAuthenticationService.getCpToken = jest.fn(() => Promise.resolve({token: expectedCpToken}))

                const builder = new JlrElectricVehicleRemoteControlBuilder()
                builder.commandElectricVehicleService = mockCommandElectricVehicleService
                builder.commandAuthenticationService = mockCommandAuthenticationService

                const remote = builder.build()

                // Act
                await remote.startCharging()

                // Assert
                expect(mockCommandElectricVehicleService.startCharging).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    expect.any(String),
                    expectedCpToken)
            })

        })   

    })

    describe('Stop charging', () => {
        test.each(['some token', 'fake token', 'hello world'])
        ('uses access token `%s`', async (expectedAccessToken) => {
            // Arrange
            const mockCommandElectricVehicleService = createMock<CommandElectricVehicleService>()
            const mockVehicleRemoteAuthenticator = createMock<VehicleRemoteAuthenticator>()
            mockVehicleRemoteAuthenticator.getAccessToken = jest.fn(() => Promise.resolve (expectedAccessToken))

            const builder = new JlrElectricVehicleRemoteControlBuilder()
            builder.vehicleRemoteAuthenticator = mockVehicleRemoteAuthenticator
            builder.commandElectricVehicleService = mockCommandElectricVehicleService

            const remote = builder.build()

            // Act
            await remote.stopCharging()

            //Assert
            expect(mockCommandElectricVehicleService.stopCharging).toHaveBeenCalledWith(
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