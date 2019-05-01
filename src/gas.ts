import { SlackResponse } from "./typings";

export function toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}