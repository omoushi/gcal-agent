import { ScriptProps, SlackEventParameter } from "./typings"
import {scriptProperties} from "./properties"
import { toTextOutput } from "./gas"
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { analyzer, verifier} from "./api/provider";
import { AnalysisResult } from "./api/types";

export function doPost(e: SlackEventParameter): TextOutput {
    const scriptProps: ScriptProps = scriptProperties();
    console.log('slack_signed_secret', scriptProps.slack_signed_secret);
    console.log('calendar_id', scriptProps.calendar_id);
    console.log('slack_token', scriptProps.slack_token);
    console.log('signed_secret', e.parameter.signed_secret);
    console.log('text', e.parameter.text);
    verifier.verify(scriptProps.slack_signed_secret, e.parameter.signed_secret);
    const analysisResult: AnalysisResult = analyzer.analyze(e.parameter.text);
    if (!analysisResult.isOk) {
        return toTextOutput({ text: analysisResult.error });
    }
    return toTextOutput({ text: 'analysis ok' });
}
