import { JlrRemoteAuthenticationCache } from '../../src/Remotes/JlrVehicleRemoteAuthenticationCache'

const testCases: [string, number][] = [
    ['a', 1],
    ['z', 2],
    ['token', 3],
    ['ignored', 4],
    ['anything', 5]]

describe('JLR Remote Authentication Cache', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.spyOn(global, 'setTimeout')
        jest.spyOn(global, 'clearTimeout')
    })

    describe('Cache Authentication', () => {
        test.each([
            ['important?', 0],
            ['some token', -1],
            ['another token', Number.NaN]])
            ('does not cache when expiresIn is negative or NaN (token: `%s`, expiresIs: `%s`)', (accessToken, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(accessToken, expiresIn)

                // Assert.
                expect(setTimeout).toBeCalledTimes(0)
            })
        
        test.each(testCases)
            ('sets timeout to clear cache', (accessToken, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(accessToken, expiresIn)

                // Assert.
                expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expiresIn * 1000)
            })
        
        test.each(testCases)
            ('clears last timeout', (accessToken, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(accessToken, expiresIn)

                // Assert.
                expect(clearTimeout).toHaveBeenCalled()
            })
    })

    describe('Get Cached Authentication', () => {
        test('returns expired cache when nothing cached', () => {
            // Arrange.
            const authenticatorCache = new JlrRemoteAuthenticationCache()

            // Act.
            const response = authenticatorCache.getCachedAuthentication()

            // Assert.
            expect(response).toEqual({ isExpired: true })
        })

        test.each(testCases)
            ('returns cached authentication when cached has not expired', (accessToken, expiresIn) => {
                // Arrange.
                const authenticatorCache = new JlrRemoteAuthenticationCache()
                authenticatorCache.cacheAuthentication(accessToken, expiresIn)

                // Act.
                const response = authenticatorCache.getCachedAuthentication()

                // Assert.
                expect(response).toEqual({ isExpired: false, accessToken })
            })

        test.each(testCases)
            ('returns expired cached when cached item has expired', (accessToken, expiresIn) => {
                // Arrange.
                const authenticatorCache = new JlrRemoteAuthenticationCache()
                authenticatorCache.cacheAuthentication(accessToken, expiresIn)

                // Act.
                jest.runAllTimers()
                const response = authenticatorCache.getCachedAuthentication()

                // Assert.
                expect(response).toEqual({ isExpired: true })
            })
    })
})
