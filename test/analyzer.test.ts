import { analyze } from "../src/impl/analyzer";
import { extractableDate, extractDate } from "../src/impl/dateExtractor";

jest.mock('../src/impl/dateExtractor');
const mockExtractDate = <jest.Mock<{ date: Date, error?: string }, [string]>>extractDate;
const mockExtractableDate = <jest.Mock<boolean, [string]>>extractableDate;

describe('analyze', () => {
    const dateToMock = new Date('2019-5-4');

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
            beforeEach(() => mockExtractDate.mockReturnValue({ date: dateToMock }));

            it('analysis is ok', () => expect(analyze(validOneWord).isOk).toBe(true));
            it('start date has 13 (default)', () => expect(analyze(validOneWord).result.startDate.getHours()).toBe(13));
            it('end date has 18 (default)', () => expect(analyze(validOneWord).result.endDate.getHours()).toBe(18));
        });
    });

    describe('withTwoWord', () => {
        const validTwoWord = 'word1 word2';

        describe('when dateExtractor regard both word1 and word2 as date', () => {
            beforeEach(() => mockExtractableDate.mockImplementation(args => args === 'word1' || args === 'word2'));

            it('analysis is not ok', () => expect(analyze(validTwoWord).isOk).toBe(false));
            it('error message exists', () => expect(analyze(validTwoWord).error).toBe('ごめん！連日登録はまだ対応してない！'));
        });

        describe('when dateExtractor regard neither word1 nor word2 as date', () => {
            beforeEach(() => mockExtractableDate.mockImplementation(args => args !== 'word1' && args !== 'word2'));

            it('analysis is not ok', () => expect(analyze(validTwoWord).isOk).toBe(false));
            it('error message exists', () => expect(analyze(validTwoWord).error).toBe('日付がわかりませんでした。'));
        });

        describe('when dateExtractor regard word1 as date', () => {
            beforeEach(() => mockExtractableDate.mockImplementation(args => args === 'word1'));
            beforeEach(() => mockExtractDate.mockReturnValue({ date: dateToMock }));

            it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
            it('start date has 13 (default)', () => expect(analyze(validTwoWord).result.startDate.getHours()).toBe(13));
            it('end date has 18 (default)', () => expect(analyze(validTwoWord).result.endDate.getHours()).toBe(18));
        });

        describe('when dateExtractor regard word2 as date', () => {
            beforeEach(() => mockExtractableDate.mockImplementation(args => args === 'word2'));
            beforeEach(() => mockExtractDate.mockReturnValue({ date: dateToMock }));

            it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
            it('start date has 13 (default)', () => expect(analyze(validTwoWord).result.startDate.getHours()).toBe(13));
            it('end date has 18 (default)', () => expect(analyze(validTwoWord).result.endDate.getHours()).toBe(18));
        });
    });
});