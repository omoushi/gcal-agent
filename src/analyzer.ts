import { AnalysisNg, AnalysisOk, AnalysisResult, GcalEventArgs } from "./typings";

export function analyze(inputText: string): AnalysisResult {
    if (inputText === '') {
        return analysisNg('なにか入力してください。');
    }
    const lines = inputText.split(/\r\n|\r|\n/);

    if (lines.length > 1) {
        return analysisNg('複数行には対応してないです。');
    }
    const words = lines[0].split(/\s/);
    if (words.length === 1) {
        return withOneWord(words[0]);
    } else if (words.length === 2) {
        return withTwoWord(words[0], words[1]);
    } else {
        return analysisNg('ごめんなさい！内容が多くて把握しきれません！');
    }
}

function analysisNg(error: string): AnalysisNg {
    return { isOk: false, error, result: null };
}

function analysisOk(result: GcalEventArgs): AnalysisOk {
    return { isOk: true, error: '', result };
}

function withOneWord(word: string): AnalysisResult {
    const { date, error } = getDate(word);
    if (!!error) {
        return analysisNg(error);
    }
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0);
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);
    const result: GcalEventArgs = { title: 'もくもく会', startDate, endDate };
    return analysisOk(result);
}

function withTwoWord(word1: string, word2: string): AnalysisResult {
    return analysisOk(null);
}

function getDate(word: string): { date: Date, error?: string } {
    const now = new Date();
    const { month, day, error } = extractDate(word, now);
    if (!!error) {
        return { date: null, error };
    }
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

function extractDate(word: string, now: Date): { month: number, day: number, error?: string } {
    let matching: RegExpMatchArray | null;
    if ((matching = word.match(Patterns.BASIC_MONTH_DATE)) !== null) {
        return { month: Number(matching[1]), day: Number(matching[2]) };
    } else if ((matching = word.match(Patterns.JAPANESE_MONTH_DATE)) !== null) {
        return { month: Number(matching[1]), day: Number(matching[2]) };
    } else if ((matching = word.match(Patterns.JAPANESE_DATE)) !== null) {
        return { month: now.getMonth() + 1, day: Number(matching[1]) };
    } else if ((matching = word.match(Patterns.BASIC_DATE)) !== null) {
        return { month: now.getMonth() + 1, day: Number(matching[1]) };
    } else {
        return { month: null, day: null, error: '日付がわかりませんでした。' };
    }
}
