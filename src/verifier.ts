export function verify(serverSecret: string, clientSecret: string) {
    if (clientSecret !== serverSecret) {
        throw new Error(`incorrect secret. (clientSecret: ${clientSecret})`)
    }
}