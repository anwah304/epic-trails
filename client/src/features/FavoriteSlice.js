import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3004";

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async (userId) => {
    const res = await axios.get(`${API}/favorites/${userId}`);
    return res.data.favorites;
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async ({ userId, trailId }) => {
    const res = await axios.post(`${API}/favorites/toggle`, { userId, trailId });
    return res.data.favorites;
  }
);

const flip = (ids, trailId) =>
  ids.includes(trailId) ? ids.filter((id) => id !== trailId) : [...ids, trailId];

const FavoriteSlice = createSlice({
  name: "favorite",

  initialState: { ids: [] },

  reducers: {
    clearFavorites: (state) => {
      state.ids = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.ids = action.payload;
      })

      .addCase(toggleFavorite.pending, (state, action) => {
        state.ids = flip(state.ids, action.meta.arg.trailId);
      })

      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.ids = action.payload;
      })

      .addCase(toggleFavorite.rejected, (state, action) => {
        state.ids = flip(state.ids, action.meta.arg.trailId);
      });
  },
});

export const { clearFavorites } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;