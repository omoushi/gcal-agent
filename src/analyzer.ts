import { AnalysisNg, AnalysisOk, AnalysisResult, AnalysisData } from "./types";
import { extractableDate, extractDate } from "./dateExtractor";

export function analyze(inputText: string): AnalysisResult {
    if (inputText === '') {
        return ng('なにか入力してください。');
    }
    const lines = inputText.split(/\r\n|\r|\n/);
    if (lines.length > 1) {
        return ng('複数行には対応してないです。');
    }
    const words = lines[0].split(/\s/);
    if (words.length === 1) {
        return withOneWord(words[0]);
    } else if (words.length === 2) {
        return withTwoWord(words[0], words[1]);
    } else {
        return ng('ごめんなさい！内容が多くて把握しきれません！');
    }
}

function ng(error: string): AnalysisNg {
    return { isOk: false, error, data: null };
}

function ok(data: AnalysisData): AnalysisOk {
    return { isOk: true, error: '', data: data };
}

/**
 * @param word is regarded as day number.
 */
function withOneWord(word: string): AnalysisResult {
    const { date, error } = extractDate(word);
    if (!error) {
        return ok(makeGcalEventArgs(date));
    } else {
        return ng(error);
    }
}

/**
 * @param word1 is regarded as day number or title
 * @param word2 is regarded as day number or title
 */
function withTwoWord(word1: string, word2: string): AnalysisResult {
    const isWord1Date = extractableDate(word1);
    const isWord2Date = extractableDate(word2);
    if (isWord1Date && isWord2Date) {
        return { isOk: false, error: 'ごめん！連日登録はまだ対応してない！', data: null };
    } else if (isWord1Date) {
        const { date } = extractDate(word1);
        return ok(makeGcalEventArgs(date, word2));
    } else if (isWord2Date) {
        const { date } = extractDate(word2);
        return ok(makeGcalEventArgs(date, word1));
    } else {
        return { isOk: false, error: '日付がわかりませんでした。', data: null };
    }
}

const DEFAULT_TITLE = 'もくもく会';
const DEFAULT_START_HOUR = 13;
const DEFAULT_END_HOUR = 18;

function makeGcalEventArgs(date, title = DEFAULT_TITLE) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), DEFAULT_START_HOUR, 0);
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), DEFAULT_END_HOUR, 0);
    return { title: (title || DEFAULT_TITLE), startDate, endDate };
}
