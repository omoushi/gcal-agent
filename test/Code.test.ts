import {doPost} from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import {ScriptProps, SlackEventParameter} from "../src/typings"
import * as properties from '../src/properties'
import * as verifier from '../src/verifier'

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties
jest.mock('../src/verifier');
const mockVerify = <jest.Mock<ScriptProps>>verifier.verify

describe('doPost', () => {
    beforeEach(() => mockScriptProperties.mockReturnValue({calendar_id: '', slack_token: '', slack_signed_secret: ''}))

    it('executes without causing exception', () => doPost(e))

    describe('module calling', () => {
        beforeEach(() => mockVerify.mockClear())

        it('called verifying once', () => {
            doPost(e)
            expect(mockVerify).toHaveBeenCalledTimes(1)
        })
    })
})