import ScriptProperties = GoogleAppsScript.Properties.ScriptProperties
import { ScriptProps } from "./typings"

export function scriptProperties(): ScriptProps {
    const scriptProperties: ScriptProperties = PropertiesService.getScriptProperties()
    return scriptProperties.getProperties() as ScriptProps;
}