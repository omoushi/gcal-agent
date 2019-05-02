import { doPost } from "../src/Code"
import exampleEventParameter from "./resources/example_event_parameter.json"
import exampleScriptProperties from "./resources/example_script_properties.json"
import { AnalysisResult, GcalEventArgs, ScriptProps, SlackEventParameter, Verification } from "../src/types";
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { analyze } from "../src/analyzer";
import { verify } from "../src/verifier";
import { createEvent, toTextOutput } from "../src/gas";
import { scriptProperties } from "../src/properties";

const e: SlackEventParameter = <SlackEventParameter>exampleEventParameter;
const scriptProps: ScriptProps = <ScriptProps>exampleScriptProperties;

jest.mock('../src/properties');
jest.mock('../src/analyzer');
jest.mock('../src/verifier');
jest.mock('../src/gas');
const mockScriptProperties = <jest.Mock<ScriptProps>>scriptProperties;
mockScriptProperties.mockReturnValue(scriptProps);
const mockAnalyze = <jest.Mock<AnalysisResult, [string]>>analyze;
const mockVerify = <jest.Mock<Verification, [string, string]>>verify;
const mockToTextOutput = <jest.Mock<TextOutput>>toTextOutput;
const mockCreateEvent = <jest.Mock<string, [string, GcalEventArgs]>>createEvent;
mockCreateEvent.mockImplementation((calendarId, gcalEventArgs) => gcalEventArgs.title);

describe('doPost', () => {
    beforeEach(() => [mockVerify, mockAnalyze, mockToTextOutput, mockToTextOutput].forEach(mock => mock.mockClear()));
    beforeEach(() => doPost(e));

    describe('when analysis error', () => {
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

    describe('when analysis success', () => {
        beforeAll(() => mockAnalyze.mockReturnValue({
            isOk: true,
            error: '',
            result: { title: 'Test Title', startDate: new Date(), endDate: new Date() }
        }));

        it('called verifying once', () => expect(mockVerify).toHaveBeenCalledTimes(1));
        it('called validate once', () => expect(mockAnalyze).toHaveBeenCalledTimes(1));
        it('called validate with collect params', () => {
            expect(mockAnalyze).toHaveBeenLastCalledWith(e.parameter.text);
        });
        it('called toTextOutput once', () => expect(mockToTextOutput).toHaveBeenCalledTimes(1));
        it('called toTextOutput with collect params', () => {
            expect(mockToTextOutput).toHaveBeenLastCalledWith({ text: '予定「Test Title」をカレンダーに登録しました。' });
        });
    });
});
