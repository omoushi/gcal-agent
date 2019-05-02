import { GasApiProxy, SlackResponse } from "../api/types";

export const gasApiProxy: GasApiProxy = {
    toTextOutput(response: SlackResponse): GoogleAppsScript.Content.TextOutput {
        return ContentService
            .createTextOutput(JSON.stringify(response))
            .setMimeType(ContentService.MimeType.JSON);
    }
};
