import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/UserSlice";
import TrailReducer from "./features/TrailSlice";
import guideReducer from "./features/GuideSlice";
export const store = configureStore({
  reducer: { 
    user: UserReducer, 
    trail: TrailReducer,
    guide: guideReducer
 },
});
