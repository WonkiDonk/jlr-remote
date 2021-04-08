import { JlrVehicleRemoteControl } from "../../src/Remotes/JlrVehicleRemoteControl"
import { createMock } from 'ts-auto-mock'
import { CommandVehicleService} from '../../src/Services/CommandVehicleService'
import { VehicleRemoteAuthenticator } from "../../src/Remotes/Types"

describe('JLR Vehicle Remote Control', () => {
    describe('Beep and flash', () => {
        test.each(['hello world', 'fake token', 'bad token'])
        ('uses access token `%s`', async (expectedAccessToken: string) => {
            // Arrange
            const mockVehicleRemoteAuthentication = createMock<VehicleRemoteAuthenticator>()
            const mockGetAccessToken = jest.fn()
            mockGetAccessToken.mockImplementation(() => Promise.resolve(expectedAccessToken))

            mockVehicleRemoteAuthentication.getAccessToken = mockGetAccessToken

            const mockService = createMock<CommandVehicleService>()
            const remote = new JlrVehicleRemoteControl('', '', mockVehicleRemoteAuthentication, mockService)
            
            // Act
            await remote.beepAndFlash()
            
            // Assert
            expect(mockService.honkHorn).toHaveBeenCalledWith(
                expectedAccessToken,
                expect.any(String),
                expect.any(String),
                expect.any(String)
            )
        })

        test.skip('uses device ID `%s`', () => {

        })

        test.skip('uses the VIN `%s`', () => {

        })

        describe('Gets hblf command token',() => {
            test.skip('uses access token `%s`', () => {

            })
    
            test.skip('uses device ID `%s`', () => {
    
            })
    
            test.skip('uses the VIN `%s`', () => {
    
            })

            test.skip('uses user ID `%s`', () => {

            })

            test.skip('uses last four of VIN `%s`', () => {

            })
        })

        test.skip('uses the hblf command token `%s`', () => {

        })
    })

    describe('Lock vehicle', () => {

    })

    describe('Unlock vehicle', () => {

    })

    describe('Get lock state', () => {

    })
})