import { describe, it, expect } from 'vitest';
import myUserSlice from '../features/UserSlice';

const UserTestState = {
    user: {},
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false
}
describe("User Slice Initial State Test...", () => {
    it("Must match the initial state", () => {
        expect(myUserSlice(undefined, {type : "unknown"})).toEqual(UserTestState)
    })
})