import examples from './src/Examples'

const [_1, _2, deviceId, username, password, vin, userPin] = process.argv

if (deviceId && username && password && vin && userPin) {
    console.log('Attempting to preconditioning ICE vehicle...')
    
    examples.preconditionIceCar(deviceId, username, password, vin, userPin)
        .then(_ => console.log('Done - check see if the air conditioning is running in your car 🎉'))
        .catch(error => console.trace('An error occurred', error))
} else {
    console.info('Usage:\n\tnode ./dist/test-ice.js [deviceId] [username] [password] [vin] [userPin]')
}