import ScriptProperties = GoogleAppsScript.Properties.ScriptProperties;
import { ScriptProps } from "./types";

export function scriptProperties(): ScriptProps {
    const scriptProperties: ScriptProperties = PropertiesService.getScriptProperties();
    return scriptProperties.getProperties() as ScriptProps;
}