export function verify(serverSecret: string, clientSecret: string): void {
    if (clientSecret !== serverSecret) {
        throw new Error(`incorrect secret. (clientSecret: ${clientSecret})`);
    }
}
