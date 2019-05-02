import { analyze } from "../src/impl/analyzer";
import { extractDate } from "../src/impl/dateExtractor";

jest.mock('../src/impl/dateExtractor');
const mockExtractDate = <jest.Mock<{ date: Date, error?: string }, [string]>>extractDate;

describe('analyze', () => {

    describe('when text has multiple lines', () => {
        const multiLineWord = '16\n17';
        it('validation is not ok', () => {
            expect(analyze(multiLineWord)).toEqual({ isOk: false, error: '複数行には対応してないです。', result: null });
        });
    });

    describe('when text is empty', () => {
        const emptyWord = '';
        it('validation is not ok', () => {
            expect(analyze(emptyWord)).toEqual({ isOk: false, error: 'なにか入力してください。', result: null });
        });
    });

    describe('when text has more than 2 word', () => {
        const moreThan2Word = '1 2 3';
        it('validation is not ok', () => {
            expect(analyze(moreThan2Word)).toEqual({ isOk: false, error: 'ごめんなさい！内容が多くて把握しきれません！', result: null });
        });
    });

    describe('withOneWord', () => {
        const validOneWord = '1';

        describe('when dateExtractor could not extract date', () => {
            beforeEach(() => mockExtractDate.mockReturnValue({ date: null, error: 'error' }));

            it('validation is not ok', () => {
                expect(analyze(validOneWord)).toEqual({ isOk: false, error: 'error', result: null });
            });
        });

        describe('when dateExtractor could extract date', () => {
            const year = 2019, month = 5, day = 4;
            beforeEach(() => mockExtractDate.mockReturnValue({ date: new Date(year, month, day) }));

            it('analysis is ok', () => expect(analyze(validOneWord).isOk).toBe(true));
            it('start date has 13 (default)', () => expect(analyze(validOneWord).result.startDate.getHours()).toBe(13));
            it('end date has 18 (default)', () => expect(analyze(validOneWord).result.endDate.getHours()).toBe(18));
        });
    });
});