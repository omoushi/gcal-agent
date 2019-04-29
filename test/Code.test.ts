import {doPost} from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import {ScriptProps, SlackEventParameter} from "../src/typings"
import * as properties from '../src/properties'
import * as verifier from '../src/verifier'

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter
const scriptProps: ScriptProps = <ScriptProps>exampleScriptProperties

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties
jest.mock('../src/verifier');
const mockVerify = <jest.Mock<ScriptProps>>verifier.verify

describe('doPost', () => {
    beforeEach(() => mockScriptProperties.mockReturnValue(scriptProps))

    it('executes without causing exception', () => doPost(e))

    describe('module calling', () => {
        beforeEach(() => mockVerify.mockClear())

        it('called verifying once', () => {
            doPost(e)
            expect(mockVerify).toHaveBeenCalledTimes(1)
        })
    })
})