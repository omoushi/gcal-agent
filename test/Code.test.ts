import { doPost } from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import { ScriptProps, SlackEventParameter } from "../src/typings"
import * as properties from '../src/properties'
import * as gas from '../src/gas'
import { AnalysisResult } from "../src/api/types";
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { analyzer, verifier } from "../src/api/provider";

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter;
const scriptProps: ScriptProps = <ScriptProps>exampleScriptProperties;

jest.mock('../src/properties');
const mockScriptProperties = <jest.Mock<ScriptProps>>properties.scriptProperties;
mockScriptProperties.mockReturnValue(scriptProps);
jest.mock('../src/gas');
const mockToTextOutput = <jest.Mock<TextOutput>>gas.toTextOutput;

jest.mock('../src/api/provider');
const mockAnalyze = <jest.Mock<AnalysisResult, [string]>>analyzer.analyze;
const mockVerify = <jest.Mock<void, [string, string]>>verifier.verify;

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
