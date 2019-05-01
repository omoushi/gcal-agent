export function toTextOutput(json): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}