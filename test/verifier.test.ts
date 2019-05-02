import { verify } from "../src/verifier"

describe('verify', () => {
    describe('when client differs from server', () => {
        const verification = verify('a', 'b');
        it('it is not ok', () => expect(verification.isOk).toBe(false));
        it('return error message', () => expect(verification.error).toBe('トークンが違います。clientToken: b'));
    });

    describe('when client same to server', () => {
        const verification = verify('a', 'a');
        it('it is ok', () => expect(verification.isOk).toBe(true));
        it('not return error message', () => expect(verification.error).toBe(''));
    });
});