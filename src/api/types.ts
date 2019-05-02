//////////////////////////////////////////////////////////////////
// gcal-agent Domain Types
//////////////////////////////////////////////////////////////////

export interface Verifier { verify(serverSecret: string, clientSecret: string): void }

export type AnalysisOk = { isOk: true, error: '', result: GcalEventArgs }
export type AnalysisNg = { isOk: false, error: string, result: null }
export type AnalysisResult = AnalysisNg | AnalysisOk
export interface Analyzer { analyze(inputText: string): AnalysisResult }

/**
 * Argument bundle type of `Calendar.createEvent`
 */
export type GcalEventArgs = {
    title: string,
    startDate: Date,
    endDate: Date
}

