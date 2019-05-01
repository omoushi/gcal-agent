import { doPost } from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import { AnalysisResult, ScriptProps, SlackEventParameter } from "../src/typings"
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
const mockAnalyze = <jest.Mock<AnalysisResult>>analyzer.analyze;
jest.mock('../src/gas');
const mockToTextOutput = <jest.Mock<TextOutput>>gas.toTextOutput;

describe('doPost', () => {
    beforeEach(() => [mockVerify, mockAnalyze, mockToTextOutput, mockToTextOutput].forEach(mock => mock.mockClear()));
    beforeEach(() => doPost(e));

    describe('when validation error', () => {
        beforeAll(() => mockAnalyze.mockReturnValue({ isOk: false, error: 'error', result: null }));

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called validate once', () => expect(mockAnalyze).toHaveBeenCalledTimes(1));
        it('called validate with collect params', () => {
            expect(mockAnalyze).toHaveBeenLastCalledWith(e.parameter.text);
        });
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
        it('called toTextOutput with collect params', () => {
            expect(mockToTextOutput).toHaveBeenLastCalledWith({ text: 'error' });
        });
    });

    describe('when validation success', () => {
        beforeAll(() => mockAnalyze.mockReturnValue({
            isOk: true,
            error: '',
            result: { title: '', startDate: new Date(), endDate: new Date() }
        }));

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called validate once', () => expect(mockAnalyze).toHaveBeenCalledTimes(1));
        it('called validate with collect params', () => {
            expect(mockAnalyze).toHaveBeenLastCalledWith(e.parameter.text);
        });
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
        it('called toTextOutput with collect params', () => {
            expect(mockToTextOutput).toHaveBeenLastCalledWith({ text: 'analysis ok' });
        });
    });
});
