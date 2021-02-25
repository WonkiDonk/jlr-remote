# jlr-remote

[![Support the Project](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/william-cowell/donate)

Library for interacting with the Jaguar Land Rover Remote API using TypeScript or JavaScript.

## Examples

[Examples](/src/Examples/index.ts) are provided for:

- Getting a list of electric vehicles on an account
- Getting the charge level of an electric vehicle
- Preconditioning an electric vehicle (EVs)
- Locking a vehicle
- Preconditioning a vehicle with an internal combustion engine (ICEs)

> **Please note**: each example shows authentication, device registration and logging in. You only need to complete this once per session or until your `access_token` expires. Once your `access_token` has expired, you can refresh it using the `authenticationService.refreshToken(deviceId, refresh_token)` method instead of the auth/device reg/log in process.

## Acknowledgements

This plug in is based on the work of [jlrpy](https://github.com/ardevd/jlrpy) and the excellent
reverse engineering of the [InControl API](https://documenter.getpostman.com/view/6250319/RznBMzqo)
contributed by [ardevd](https://github.com/ardevd).
