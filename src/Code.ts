import {scriptProperties} from "./properties";

export function doPost() {
    const prop = scriptProperties();
    console.log('verify_token', prop.verify_token);
    console.log('calendar_id', prop.calendar_id);
    console.log('token', prop.token);
}