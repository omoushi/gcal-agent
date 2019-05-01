import { doPost } from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import { ScriptProps, SlackEventParameter, ValidationResult } from "../src/typings"
import * as properties from '../src/properties'
import * as verifier from '../src/verifier'
import * as analyzer from '../src/analyzer'
import * as gas from '../src/gas'
import TextOutput = GoogleAppsScript.Content.TextOutput;

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter;
const scriptProps: ScriptProps = <ScriptProps>exampleScriptProperties;

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties;
mockScriptProperties.mockReturnValue(scriptProps);
jest.mock('../src/verifier');
const mockVerify = <jest.Mock<ScriptProps>>verifier.verify;
jest.mock('../src/analyzer');
const mockValidate = <jest.Mock<ValidationResult>>analyzer.validate;
jest.mock('../src/gas');
const mockToTextOutput = <jest.Mock<TextOutput>>gas.toTextOutput;

describe('doPost', () => {
    beforeEach(() => [mockVerify, mockToTextOutput, mockValidate, mockToTextOutput].forEach(mock => mock.mockClear()));
    beforeEach(() => doPost(e));

    describe('when validation error', () => {
        beforeAll(() => mockValidate.mockReturnValue({ isValid: false, message: 'validation error message' }));

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called validate once', () => expect(mockValidate).toHaveBeenCalledTimes(1));
        it('called validate with collect params', () => {
            expect(mockValidate).toHaveBeenLastCalledWith(e.parameter.text);
        });
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
        it('called toTextOutput with collect params', () => {
            expect(mockToTextOutput).toHaveBeenLastCalledWith({ text: 'validation error message' });
        });
    });

    describe('when validation success', () => {
        beforeAll(() => mockValidate.mockReturnValue({ isValid: true }));

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called validate once', () => expect(mockValidate).toHaveBeenCalledTimes(1));
        it('called validate with collect params', () => {
            expect(mockValidate).toHaveBeenLastCalledWith(e.parameter.text);
        });
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
        it('called toTextOutput with collect params', () => {
            expect(mockToTextOutput).toHaveBeenLastCalledWith({ text: 'This is test response' });
        });
    });
});
