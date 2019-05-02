import { analyze } from "../src/impl/analyzer";

describe('analyze', () => {

    describe('when text has multiple lines', () => {
        it('validation is not ok', () => {
            expect(analyze('16\n17')).toEqual({ isOk: false, error: '複数行には対応してないです。', result: null });
        });
    });

    describe('when text is empty', () => {
        it('validation is not ok', () => {
            expect(analyze('')).toEqual({ isOk: false, error: 'なにか入力してください。', result: null  });
        });
    });

    describe('when text has more than 2 word', () => {
        it('validation is not ok', () => {
            expect(analyze('1 2 3')).toEqual({ isOk: false, error: 'ごめんなさい！内容が多くて把握しきれません！', result: null  });
        });
    });

    describe('when first word is not a day', () => {
        it('validation is not ok', () => {
            expect(analyze('string')).toEqual({ isOk: false, error: '日付がわかりませんでした。', result: null  });
        });
    });
});