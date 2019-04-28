import ScriptProperties = GoogleAppsScript.Properties.ScriptProperties

export type GasProps = {
    verify_token: string
    calendar_id: string
    token: string
}

export function scriptProperties(): GasProps {
    const scriptProperties: ScriptProperties = PropertiesService.getScriptProperties()
    return scriptProperties.getProperties() as GasProps;
}