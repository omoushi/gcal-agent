import { scriptProperties } from "./properties"
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { AnalysisResult, ScriptProps, SlackEventParameter, SlackResponse } from "./api/types";
import { verify } from "./impl/verifier";
import { analyze } from "./impl/analyzer";
import { toTextOutput } from "./impl/gas";

export function doPost(e: SlackEventParameter): TextOutput {
    const scriptProps: ScriptProps = scriptProperties();
    const response = doProcess(e, scriptProps);
    return toTextOutput(response);
}

function doProcess(e: SlackEventParameter, scriptProps: ScriptProps): SlackResponse {
    console.log('scriptProps', scriptProps);
    console.log('slack_signed_secret', scriptProps.slack_signed_secret);
    console.log('calendar_id', scriptProps.calendar_id);
    console.log('slack_token', scriptProps.slack_token);
    console.log('signed_secret', e.parameter.signed_secret);
    console.log('text', e.parameter.text);
    verify(scriptProps.slack_signed_secret, e.parameter.signed_secret);
    const analysisResult: AnalysisResult = analyze(e.parameter.text);
    if (!analysisResult.isOk) {
        return { text: analysisResult.error };
    }
    return { text: 'analysis ok' };
}
