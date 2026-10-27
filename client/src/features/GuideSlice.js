import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  guides: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// ================= ADD GUIDE =================
export const addGuide = createAsyncThunk(
  "guide/addGuide",
  async (guideData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/addGuide",
        guideData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ================= GET GUIDES =================
export const getGuides = createAsyncThunk(
  "guide/getGuides",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3004/getGuides");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ================= DELETE GUIDE =================
export const deleteGuide = createAsyncThunk(
  "guide/deleteGuide",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/deleteGuide/${id}`
      );
      return { id, message: response.data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ================= EDIT GUIDE =================
export const editGuide = createAsyncThunk(
  "guide/editGuide",
  async (guideData, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/editGuide/${guideData.id}`,
        guideData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ================= SLICE =================
export const GuideSlice = createSlice({
  name: "guide",
  initialState,

  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= ADD GUIDE =================
      .addCase(addGuide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGuide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.guides.push(action.payload.guide);
      })
      .addCase(addGuide.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= GET GUIDES =================
      .addCase(getGuides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guides = action.payload;
      })
      .addCase(getGuides.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= DELETE GUIDE =================
      .addCase(deleteGuide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGuide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.guides = state.guides.filter(
          (guide) => guide._id !== action.payload.id
        );
      })
      .addCase(deleteGuide.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= EDIT GUIDE =================
      .addCase(editGuide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGuide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;

        const index = state.guides.findIndex(
          (g) => g._id === action.payload.guide._id
        );
        if (index !== -1) {
          state.guides[index] = action.payload.guide;
        }
      })
      .addCase(editGuide.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});


export const { resetMessage } = GuideSlice.actions;
export default GuideSlice.reducer;