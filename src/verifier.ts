import { Verification } from "./types";

export function verify(serverToken: string, clientToken: string): Verification {
    if (clientToken === serverToken) {
        return { isOk: true, error: '' };
    } else {
        return { isOk: false, error: `トークンが違います。clientToken: ${clientToken}` };
    }
}
