import { doPost, doProcess } from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import {ScriptProps, SlackEventParameter} from "../src/typings"
import * as properties from '../src/properties'
import * as verifier from '../src/verifier'
import * as gas from '../src/gas'
import TextOutput = GoogleAppsScript.Content.TextOutput;

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter;
const scriptProps: ScriptProps = <ScriptProps>exampleScriptProperties;

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties;
jest.mock('../src/verifier');
const mockVerify = <jest.Mock<ScriptProps>>verifier.verify;
jest.mock('../src/gas');
const mockToTextOutput = <jest.Mock<TextOutput>>gas.toTextOutput;

describe('doPost', () => {
    beforeAll(() => mockScriptProperties.mockReturnValue(scriptProps));

    it('executes without causing exception', () => doPost(e));

    describe('module calling', () => {
        beforeEach(() => {
            mockVerify.mockClear();
            mockToTextOutput.mockClear();
            doPost(e);
        });

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
    });
});

describe('doProcess', () => {
    it('return response', () => {
        expect(doProcess(e, scriptProps)).toEqual({ text: 'This is test response' });
    });
});