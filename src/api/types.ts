//////////////////////////////////////////////////////////////////
// gcal-agent Domain Types
//////////////////////////////////////////////////////////////////

export interface Verifier { verify(serverSecret: string, clientSecret: string): void }

export type AnalysisOk = { isOk: true, error: '', result: GcalEventArgs }
export type AnalysisNg = { isOk: false, error: string, result: null }
export type AnalysisResult = AnalysisNg | AnalysisOk
export interface Analyzer { analyze(inputText: string): AnalysisResult }

/**
 * EventParameter when Slack requests
 * `signed_secret` is [slack secret value to verify](https://api.slack.com/docs/verifying-requests-from-slack)
 */
export type SlackEventParameter = EventParameter & {
    parameter: {
        signed_secret: string
        text: string
    }
}

/**
 * Argument bundle type of `Calendar.createEvent`
 */
export type GcalEventArgs = {
    title: string,
    startDate: Date,
    endDate: Date
}

/**
 * Script Properties that gcal-agent specifies in Google Apps Script
 * @see https://developers.google.com/apps-script/guides/properties
 */
export type ScriptProps = {
    slack_signed_secret: string
    calendar_id: string
    slack_token: string
}

export interface GasApiProxy {
    toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput
}

//////////////////////////////////////////////////////////////////
// Google Apps Script Domain Types
//////////////////////////////////////////////////////////////////

/**
 * Request Parameter Type of Google Apps Script Web Apps
 * @see https://developers.google.com/apps-script/guides/web
 */
export type EventParameter = {
    queryString: string | null,
    parameter: {
        [key: string]: string
    },
    parameters: {
        [key: string]: string[]
    },
    contextPath: '',
    contentLength: number,
    postData?: {
        length: number,
        type: string,
        contents: string
        name: 'postData'
    }
}

//////////////////////////////////////////////////////////////////
// Slack Domain Types
//////////////////////////////////////////////////////////////////

/**
 * Response type that slack slash command expects.
 * @see https://api.slack.com/slash-commands
 */
export type SlackResponse = {
    text: string
}
