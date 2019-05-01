import { ScriptProps, SlackEventParameter, SlackResponse } from "./typings"
import {scriptProperties} from "./properties"
import {verify} from "./verifier"
import { toTextOutput } from "./gas"

export function doPost(e: SlackEventParameter) {
    const scriptProps = scriptProperties();
    verify(scriptProps.slack_signed_secret, e.parameter.signed_secret);
    const result = doProcess(e, scriptProps);
    return toTextOutput(JSON.stringify(result));
}

export function doProcess(e: SlackEventParameter, scriptProps: ScriptProps): SlackResponse {
    console.log('slack_signed_secret', scriptProps.slack_signed_secret);
    console.log('calendar_id', scriptProps.calendar_id);
    console.log('slack_token', scriptProps.slack_token);
    console.log('signedSecret', e.parameter.signed_secret);
    return { text: 'This is test response' };
}