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
    const analysis = analyze(e.parameter.text);
    if (analysis.isOk) {
        const title = createEvent(scriptProps.calendar_id, analysis.result, scriptProps.guests);
        return { response_type: 'in_channel', text: `予定「${title}」をカレンダーに登録しました。` };
    } else {
        return { response_type: 'in_channel', text: analysis.error };
    }
}
