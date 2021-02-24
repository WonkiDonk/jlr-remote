const baseUrls = {
    IFAS_BASE_URL: 'https://ifas.prod-row.jlrmotor.com/ifas/jlr',
    IFOP_BASE_URL: 'https://ifop.prod-row.jlrmotor.com/ifop/jlr',
    IF9_BASE_URL:  'https://if9.prod-row.jlrmotor.com/if9/jlr'
}

const getHeaders = (accessToken: string, deviceId: string, partial?: any) => {
    return {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
        'Authorization': `Bearer ${accessToken}`,
        ...partial
    }
}

export { getHeaders, baseUrls }
