import {SlackEventParameter} from "./typings"
import {scriptProperties} from "./properties"
import {verify} from "./verifier"

export function doPost(e: SlackEventParameter) {
    const scriptProps = scriptProperties()
    verify(scriptProps.slack_signed_secret, e.parameter.signed_secret)
    console.log('slack_signed_secret', scriptProps.slack_signed_secret)
    console.log('calendar_id', scriptProps.calendar_id)
    console.log('slack_token', scriptProps.slack_token)
    console.log('signedSecret', e.parameter.signed_secret)
}