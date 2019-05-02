import { verifier } from "../src/impl/verifier"

describe('verify', () => {
    describe('when client differs from server', () => {
        it('throws VerificationError', () => {
            expect(() => verifier.verify('a', 'b')).toThrow();
        });
    });

    describe('when client same to server', () => {
        it('not throws VerificationError', () => {
            expect(() => verifier.verify('a', 'a')).not.toThrow();
        });
    });
});