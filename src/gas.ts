import { SlackResponse } from "./api/types";

export function toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}