//////////////////////////////////////////////////////////////////
// gcal-agent Domain Types
//////////////////////////////////////////////////////////////////

export type AnalysisOk = { isOk: true, error: '', data: AnalysisData }
export type AnalysisNg = { isOk: false, error: string, data: null }
export type AnalysisResult = AnalysisNg | AnalysisOk
export type VerificationOk = { isOk: true, error: '' }
export type VerificationNg = { isOk: false, error: string }
export type Verification = VerificationOk | VerificationNg

/**
 * EventParameter when Slack requests
 * `token` is [slack secret value to verify](https://api.slack.com/docs/verifying-requests-from-slack)
 */
export type SlackEventParameter = EventParameter & {
    parameter: {
        token: string
        text: string
    }
}

/**
 * dateExtractor's result data structure.
 */
export type Extraction = { date: Date, error?: string }

/**
 * Result of analyzing
 */
export type AnalysisData = {
    title: string,
    startDate: Date,
    endDate: Date
}

/**
 * Argument bundle type of `Calendar.createEvent`
 */
export type GoogleCalendarEvent = {
    calendarId: string
    title: string
    startDate: Date
    endDate: Date
    guests: string
}

/**
 * Just bundle of  hour and minute
 */
export type HourMinute = {
    hour: number
    minute: number
}

/**
 * Script Properties that gcal-agent specifies in Google Apps Script
 * - slack_verification_token: [verification_token for Slack](https://api.slack.com/docs/verifying-requests-from-slack)
 * - calendar_id: [id of google calendar for integration](https://docs.simplecalendar.io/find-google-calendar-id/)
 * - guests: comma separated mail addresses to invite
 * @see https://developers.google.com/apps-script/guides/properties
 */
export type ScriptProps = {
    slack_verification_token: string
    calendar_id: string
    guests: string
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
    contextPath: string,
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
    response_type: string
    text: string
}
