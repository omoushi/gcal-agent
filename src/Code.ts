import {scriptProperties} from "./properties";
import { SlackEventParameter } from "./typings"

export function doPost(e: SlackEventParameter) {
    const prop = scriptProperties();
    console.log('slack_secret', prop.slack_secret);
    console.log('calendar_id', prop.calendar_id);
    console.log('token', prop.token);
    const signedSecret = e.parameter.signed_secret
    console.log('signedSecret', signedSecret)
}