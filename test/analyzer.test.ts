import { analyze } from "../src/analyzer";
import { extractableDate, extractDate } from "../src/dateExtractor";
import { Extraction } from "../src/types";

jest.mock('../src/dateExtractor');
const mockExtractDate = <jest.Mock<Extraction, [string]>>extractDate;
const mockExtractableDate = <jest.Mock<boolean, [string]>>extractableDate;

describe('analyze', () => {
    const weekday = new Date('2019-5-3'); // friday
    const weekend = new Date('2019-5-4'); // saturday

    describe('when text has multiple lines', () => {
        const multiLineWord = '16\n17';
        it('validation is not ok', () => {
            expect(analyze(multiLineWord)).toEqual({ isOk: false, error: '複数行には対応してないです。', data: null });
        });
    });

    describe('when text is empty', () => {
        const emptyWord = '';
        it('validation is not ok', () => {
            expect(analyze(emptyWord)).toEqual({ isOk: false, error: 'なにか入力してください。', data: null });
        });
    });

    describe('when text has more than 2 word', () => {
        const moreThan2Word = '1 2 3';
        it('validation is not ok', () => {
            expect(analyze(moreThan2Word)).toEqual({ isOk: false, error: 'ごめんなさい！内容が多くて把握しきれません！', data: null });
        });
    });

    describe('withOneWord', () => {
        const validOneWord = '1';

        describe('when dateExtractor could not extract date', () => {
            beforeEach(() => mockExtractDate.mockReturnValue({ date: null, error: 'error' }));

            it('validation is not ok', () => {
                expect(analyze(validOneWord)).toEqual({ isOk: false, error: 'error', data: null });
            });
        });

        describe('when dateExtractor could extract date', () => {
            describe('when weekday', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekday }));

                it('analysis is ok', () => expect(analyze(validOneWord).isOk).toBe(true));
                it('start date is at 19:30 (default)', () => {
                    expect(analyze(validOneWord).data.startDate.getHours()).toBe(19)
                    expect(analyze(validOneWord).data.startDate.getMinutes()).toBe(30)
                });
                it('end date is at 21:00 (default)', () => {
                    expect(analyze(validOneWord).data.endDate.getHours()).toBe(21)
                    expect(analyze(validOneWord).data.endDate.getMinutes()).toBe(0)
                });
            })

            describe('when weekend', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekend }));

                it('analysis is ok', () => expect(analyze(validOneWord).isOk).toBe(true));
                it('start date is at 13:00 (default)', () => {
                    expect(analyze(validOneWord).data.startDate.getHours()).toBe(13)
                    expect(analyze(validOneWord).data.startDate.getMinutes()).toBe(0)
                });
                it('end date is at 18:00 (default)', () => {
                    expect(analyze(validOneWord).data.endDate.getHours()).toBe(18)
                    expect(analyze(validOneWord).data.endDate.getMinutes()).toBe(0)
                });
            })
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

            describe('when weekday', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekday }));

                it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
                it('start date is at 19:30 (default)', () => {
                    expect(analyze(validTwoWord).data.startDate.getHours()).toBe(19)
                    expect(analyze(validTwoWord).data.startDate.getMinutes()).toBe(30)
                });
                it('end date is at 21:00 (default)', () => {
                    expect(analyze(validTwoWord).data.endDate.getHours()).toBe(21)
                    expect(analyze(validTwoWord).data.endDate.getMinutes()).toBe(0)
                });
            });

            describe('when weekend', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekend }));

                it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
                it('start date is at 13:00 (default)', () => {
                    expect(analyze(validTwoWord).data.startDate.getHours()).toBe(13)
                    expect(analyze(validTwoWord).data.startDate.getMinutes()).toBe(0)
                });
                it('end date is at 18:00 (default)', () => {
                    expect(analyze(validTwoWord).data.endDate.getHours()).toBe(18)
                    expect(analyze(validTwoWord).data.endDate.getMinutes()).toBe(0)
                });
            });
        });

        describe('when dateExtractor regard word2 as date', () => {
            beforeEach(() => mockExtractableDate.mockImplementation(args => args === 'word2'));

            describe('when weekday', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekday }));

                it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
                it('start date is at 19:30 (default)', () => {
                    expect(analyze(validTwoWord).data.startDate.getHours()).toBe(19)
                    expect(analyze(validTwoWord).data.startDate.getMinutes()).toBe(30)
                });
                it('end date is at 21:00 (default)', () => {
                    expect(analyze(validTwoWord).data.endDate.getHours()).toBe(21)
                    expect(analyze(validTwoWord).data.endDate.getMinutes()).toBe(0)
                });
            });

            describe('when weekend', () => {
                beforeEach(() => mockExtractDate.mockReturnValue({ date: weekend }));

                it('analysis is ok', () => expect(analyze(validTwoWord).isOk).toBe(true));
                it('start date is at 13:00 (default)', () => {
                    expect(analyze(validTwoWord).data.startDate.getHours()).toBe(13)
                    expect(analyze(validTwoWord).data.startDate.getMinutes()).toBe(0)
                });
                it('end date is at 18:00 (default)', () => {
                    expect(analyze(validTwoWord).data.endDate.getHours()).toBe(18)
                    expect(analyze(validTwoWord).data.endDate.getMinutes()).toBe(0)
                });
            })
        });
    });
});
