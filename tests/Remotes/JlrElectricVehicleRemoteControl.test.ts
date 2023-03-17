describe('JLR Electric Vehicle Remove Control', () => {
    describe('Start charging', () => {
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