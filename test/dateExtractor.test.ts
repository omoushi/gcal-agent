import { provideNow } from "../src/impl/dateProvider";
import { extractDate } from "../src/impl/dateExtractor";

jest.mock('../src/impl/dateProvider');
const mockProvideNow = <jest.Mock<Date>>provideNow;
mockProvideNow.mockReturnValue(new Date('2019-5-4'));

describe('extractDate', () => {
    describe('when word is not day', () => {
        const { date, error } = extractDate('aaa');
        it('not return date', () => expect(date).toBe(null));
        it('return error', () => expect(error).toBe('日付がわかりませんでした。'));
    });

    describe('when word indicates past', () => {
        const { date, error } = extractDate('5/3');
        it('not return date', () => expect(date).toBe(null));
        it('return error', () => expect(error).toBe(`${new Date('2019-5-3').toString()}は過去です。`));
    });

    describe('when word is invalid day', () => {
        const { date, error } = extractDate('33');
        it('not return date', () => expect(date).toBe(null));
        it('return error', () => expect(error).toBe('不正な日付です。'));
    });

    describe('when word is basic month and day', () => {
        const { date, error } = extractDate('5/6');
        it('return date', () => expect(date).toEqual(new Date('2019-5-6')));
        it('not return error', () => expect(error).toBe(undefined));
    });

    describe('when word is basic day', () => {
        const { date, error } = extractDate('6');
        it('return date', () => expect(date).toEqual(new Date('2019-5-6')));
        it('not return error', () => expect(error).toBe(undefined));
    });

    describe('when word is japanese month and day', () => {
        const { date, error } = extractDate('5月6日');
        it('return date', () => expect(date).toEqual(new Date('2019-5-6')));
        it('not return error', () => expect(error).toBe(undefined));
    });

    describe('when word is japanese day', () => {
        const { date, error } = extractDate('6日');
        it('return date', () => expect(date).toEqual(new Date('2019-5-6')));
        it('not return error', () => expect(error).toBe(undefined));
    });
});