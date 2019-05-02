import { provideNow } from "./dateProvider";

export function extractDate(word: string): { date: Date, error?: string } {
    const now = provideNow();
    let matching: RegExpMatchArray | null;
    if ((matching = word.match(Patterns.BASIC_MONTH_DATE)) !== null) {
        return convert(Number(matching[1]), Number(matching[2]), now);
    } else if ((matching = word.match(Patterns.JAPANESE_MONTH_DATE)) !== null) {
        return convert(Number(matching[1]), Number(matching[2]), now);
    } else if ((matching = word.match(Patterns.JAPANESE_DATE)) !== null) {
        return convert(now.getMonth() + 1, Number(matching[1]), now);
    } else if ((matching = word.match(Patterns.BASIC_DATE)) !== null) {
        return convert(now.getMonth() + 1, Number(matching[1]), now);
    } else {
        return { date: null, error: '日付がわかりませんでした。' };
    }
}

function convert(month: number, day: number, now: Date): { date: Date, error?: string } {
    const date = new Date(now.getFullYear(), month - 1, day);
    if (isNaN(date.getTime()) || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return { date: null, error: '不正な日付です。' };
    }
    if (date < now) { //過去
        return { date: null, error: `${date.toString()}は過去です。` };
    }
    return { date: date };
}

const Patterns = {
    BASIC_MONTH_DATE: /^(\d{1,2})\/(\d{1,2})$/,
    BASIC_DATE: /^(\d{1,2})$/,
    BASIC_HOUR_MINUTE: /^(\d{1,2}):(\d{1,2})$/,
    BASIC_HOUR: /^(\d{1,2})$/,
    JAPANESE_MONTH_DATE: /^(\d{1,2})月(\d{1,2})日$/,
    JAPANESE_DATE: /^(\d{1,2})日$/,
    JAPANESE_HOUR_MINUTE: /^(\d{1,2})時(\d{1,2})分$/,
    JAPANESE_HOUR: /^(\d{1,2})時$/
};