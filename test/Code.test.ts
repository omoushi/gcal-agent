import { doPost } from "../src/Code"
import * as properties from "../src/properties"
import { GasProps } from "../src/properties"

jest.mock('../src/properties')
const mockScriptProperties = <jest.Mock<GasProps>>properties.scriptProperties

describe('doPost', () => {
    mockScriptProperties.mockReturnValue({ verify_token: '', token: '', calendar_id: '' });

    it('executes without causing exception', function () {
        doPost()
    })
})
