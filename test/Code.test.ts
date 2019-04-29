import {doPost} from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import {ScriptProps, SlackEventParameter} from "../src/typings"
import * as properties from '../src/properties'

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties

describe('doPost', () => {
    mockScriptProperties.mockReturnValue({ calendar_id: '', slack_token: '', slack_signed_secret: '' })

    it('executes without causing exception', () => doPost(e))
})