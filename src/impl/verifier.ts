import { Verifier } from "../api/types";

export const verifier: Verifier = {
    verify(serverSecret: string, clientSecret: string): void {
        if (clientSecret !== serverSecret) {
            throw new Error(`incorrect secret. (clientSecret: ${clientSecret})`);
        }
    }
};
