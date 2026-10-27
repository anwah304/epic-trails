import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trails: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// ================= ADD TRAIL =================
export const addTrail = createAsyncThunk(
  "trail/addTrail",
  async (trailData) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/addTrail",
        trailData
      );
      return response.data;
    } catch (error) {
      console.log("Server Error..." + error);
    }
  }
);

// ================= GET TRAILS =================
export const getTrails = createAsyncThunk(
  "trail/getTrails",
  async () => {
    try {
      const response = await axios.get("http://localhost:3004/getTrails");
      return response.data;
    } catch (error) {
      console.log("Server Error..." + error);
    }
  }
);

// ================= DELETE TRAIL =================
export const deleteTrail = createAsyncThunk(
  "trail/deleteTrail",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/deleteTrail/${id}`
      );
      return { id, message: response.data.message };
    } catch (error) {
      console.log("Server Error..." + error);
    }
  }
);

// ================= EDIT TRAIL =================
export const editTrail = createAsyncThunk(
  "trail/editTrail",
  async (trailData) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/editTrail/${trailData.id}`,
        trailData
      );
      return response.data;
    } catch (error) {
      console.log("Server Error..." + error);
    }
  }
);

// ================= SLICE =================
export const TrailSlice = createSlice({
  name: "trail",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= ADD TRAIL =================
      .addCase(addTrail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTrail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trails.push(action.payload.trail);
      })
      .addCase(addTrail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= GET TRAILS =================
      .addCase(getTrails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trails = action.payload || [];
      })
      .addCase(getTrails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= DELETE TRAIL =================
      .addCase(deleteTrail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trails = state.trails.filter(
          (trail) => trail._id !== action.payload.id
        );
      })
      .addCase(deleteTrail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ================= EDIT TRAIL =================
      .addCase(editTrail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTrail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const index = state.trails.findIndex(
          (t) => t._id === action.payload.trail._id
        );
        if (index !== -1) {
          state.trails[index] = action.payload.trail;
        }
      })
      .addCase(editTrail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default TrailSlice.reducer;