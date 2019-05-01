import { analyze } from "../src/analyzer";

describe('analyze', () => {

    describe('when text has multiple lines', () => {
        it('validation is not ok', () => {
            expect(analyze('16\n17')).toEqual({ isOk: false, error: '複数行には対応してないです。' });
        });
    });

    describe('when text is empty', () => {
        it('validation is not ok', () => {
            expect(analyze('')).toEqual({ isOk: false, error: 'なにか入力してください。' });
        });
    });

    describe('when text has more than 2 word', () => {
        it('validation is not ok', () => {
            expect(analyze('1 2 3')).toEqual({ isOk: false, error: 'ごめんなさい！内容が多くて把握しきれません！' });
        });
    });

    describe('when first word is not a day', () => {
        it('validation is not ok', () => {
            expect(analyze('string')).toEqual({ isOk: false, error: '日付がわかりませんでした。' });
        });
    });
});