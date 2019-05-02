import { verify } from "../src/impl/verifier"

describe('verify', () => {
    describe('when client differs from server', () => {
        it('throws VerificationError', () => {
            expect(() => verify('a', 'b')).toThrow();
        });
    });

    describe('when client same to server', () => {
        it('not throws VerificationError', () => {
            expect(() => verify('a', 'a')).not.toThrow();
        });
    });
});