import { GcalEventArgs, SlackResponse } from "../api/types";

export function toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

export function createEvent(calendarId: string, args: GcalEventArgs): string {
    const calendarEvent = CalendarApp
        .getCalendarById(calendarId)
        .createEvent(args.title, args.startDate, args.endDate);
    return calendarEvent.getTitle();
}
