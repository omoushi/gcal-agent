import { doPost } from "../src/Code"
import * as properties from "../src/properties"
import exampleEventParameter from "./resources/example_event_parameter.json"
import { ScriptProps, SlackEventParameter } from "../src/typings"
const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter

jest.mock('../src/properties')
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties

describe('doPost', () => {
    mockScriptProperties.mockReturnValue({ slack_secret: '', token: '', calendar_id: '' });

    it('executes without causing exception', function () {
        doPost(e)
    })
})