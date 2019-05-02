import {scriptProperties} from "./properties"
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { analyzer, gasApiProxy as gas, verifier } from "./api/provider";
import { AnalysisResult, ScriptProps, SlackEventParameter } from "./api/types";

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
        return gas.toTextOutput({ text: analysisResult.error });
    }
    return gas.toTextOutput({ text: 'analysis ok' });
}
