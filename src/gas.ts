import { GoogleCalendarEvent, SlackResponse } from "./types";

export function toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

export function createEvent(e: GoogleCalendarEvent): string {
    const calendarEvent = CalendarApp
        .getCalendarById(e.calendarId)
        .createEvent(e.title, e.startDate, e.endDate, { guests: e.guests, sendInvites: true });
    return calendarEvent.getTitle();
}
