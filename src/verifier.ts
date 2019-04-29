export function verify(serverSecret: string, clientSecret: string) {
    if (clientSecret !== serverSecret) {
        throw new VerificationError(`incorrect secret. (clientSecret: ${clientSecret})`)
    }
}

export class VerificationError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}