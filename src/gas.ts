import { GcalEventArgs, SlackResponse } from "./types";

export function toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

export function createEvent(calendarId: string, args: GcalEventArgs, guests: string): string {
    const calendarEvent = CalendarApp
        .getCalendarById(calendarId)
        .createEvent(args.title, args.startDate, args.endDate, { guests: guests, sendInvites: true });
    return calendarEvent.getTitle();
}
