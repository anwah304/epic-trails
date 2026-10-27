import myTrailSlice from '../features/TrailSlice';
import { describe, it, expect } from 'vitest';


const TrailTestState = {
  trails: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};
describe("Trail Slice Initial State Test...", () => {
    it("Must match the initial state", () => {
        expect(myTrailSlice(undefined, {type : "unknown"})).toEqual(TrailTestState)
    })
})