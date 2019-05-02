import { scriptProperties } from "./properties"
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { AnalysisResult, ScriptProps, SlackEventParameter, SlackResponse } from "./types";
import { verify } from "./verifier";
import { analyze } from "./analyzer";
import { createEvent, toTextOutput } from "./gas";

export function doPost(e: SlackEventParameter): TextOutput {
    const scriptProps: ScriptProps = scriptProperties();
    const response = doProcess(e, scriptProps);
    return toTextOutput(response);
}

function doProcess(e: SlackEventParameter, scriptProps: ScriptProps): SlackResponse {
    verify(scriptProps.slack_signed_secret, e.parameter.signed_secret);
    const analysisResult: AnalysisResult = analyze(e.parameter.text);
    if (analysisResult.isOk) {
        const title = createEvent(scriptProps.calendar_id, analysisResult.result);
        return { text: `予定「${title}」をカレンダーに登録しました。` };
    } else {
        return { text: analysisResult.error };
    }
}
