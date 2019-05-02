import { AnalysisNg, AnalysisOk, AnalysisResult, GcalEventArgs } from "../api/types";
import { extractDate } from "./dateExtractor";

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
    return { isOk: false, error, result: null };
}

function ok(result: GcalEventArgs): AnalysisOk {
    return { isOk: true, error: '', result };
}

function withOneWord(word: string): AnalysisResult {
    const { date, error } = extractDate(word);
    if (!error) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0);
        const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);
        const result: GcalEventArgs = { title: 'もくもく会', startDate, endDate };
        return ok(result);
    } else {
        return ng(error);
    }
}

function withTwoWord(word1: string, word2: string): AnalysisResult {
    return ok(null);
}
