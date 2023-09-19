import { JlrRemoteAuthenticationCache } from '../../src/Remotes/JlrVehicleRemoteAuthenticationCache'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')
jest.spyOn(global, 'clearTimeout')

const testCases: [[string, number]] = [
    ['a', 1],
    ['z', 2],
    ['token', 3],
    ['ignored', 4],
    ['anything', 5]]

describe('JLR Remote Authentication Cache', () => {
    describe('Cache Authentication', () => {
        test.each([
            ['important?', 0],
            ['some token', -1],
            ['another token', Number.NaN]])
            ('does not cache when expiresIn is negative or NaN', (token, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(token, expiresIn)

                // Assert.
                expect(setTimeout).toBeCalledTimes(0)
            })
        
        test.each(testCases)
            ('sets timeout to clear cache', (token, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(token, expiresIn)

                // Assert.
                expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expiresIn * 1000)
            })
        
        test.each([
            ['a', 1],
            ['z', 2],
            ['token', 3],
            ['ignored', 4],
            ['anything', 5]])
            ('clears last timeout', (token, expiresIn) => {
                // Arrange.
                const authenticationCache = new JlrRemoteAuthenticationCache()

                // Act.
                authenticationCache.cacheAuthentication(token, expiresIn)

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

        test.each([1,2, 3])
            ('returns expired cached when cached item has expired', () => {
                // Arrange.
                const authenticatorCache = new JlrRemoteAuthenticationCache()
                authenticatorCache.cacheAuthentication()

                // Act.
                const response = authenticatorCache.getCachedAuthentication()

                // Assert.
                expect(response).toEqual({ isExpired: true })
            })

        test.skip
            ('returns cached authentication when cached has not expired', () => {

            })
    })
})
