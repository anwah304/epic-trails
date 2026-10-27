
import myGuideSlice from '../features/GuideSlice';
import { describe, it, expect } from 'vitest';


const GuideTestState = {
  guides: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};
describe("Guide Slice Initial State Test...", () => {
    it("Must match the initial state", () => {
        expect(myGuideSlice(undefined, {type : "unknown"})).toEqual(GuideTestState)
    })
})