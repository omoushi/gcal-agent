import { scriptProperties } from "./properties"
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { ScriptProps, SlackEventParameter, SlackResponse } from "./types";
import { verify } from "./verifier";
import { analyze } from "./analyzer";
import { createEvent, toTextOutput } from "./gas";

export function doPost(e: SlackEventParameter): TextOutput {
    const scriptProps: ScriptProps = scriptProperties();
    const response = doProcess(e, scriptProps);
    return toTextOutput(response);
}

function doProcess(e: SlackEventParameter, scriptProps: ScriptProps): SlackResponse {
    const verification = verify(scriptProps.slack_verification_token, e.parameter.token);
    if (!verification.isOk) {
        return { response_type: 'in_channel', text: verification.error };
    }
    const { isOk, data, error } = analyze(e.parameter.text);
    if (isOk) {
        const title = createEvent({
            calendarId: scriptProps.calendar_id,
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            guests: scriptProps.guests
        });
        return { response_type: 'in_channel', text: `予定「${title}」をカレンダーに登録しました。` };
    } else {
        return { response_type: 'in_channel', text: error };
    }
}
