import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export interface IPhoto {
  url: string;
}

type SliceState = {
  loadingPhotos: boolean;
  photo?: IPhoto[];
};

const initialState: SliceState = {
  loadingPhotos: false,
};

export const fetchPhoto = createAsyncThunk(
  'cryptoCurrencyPage/fetchCryptoCurrencyInfo',
  async (args: { id: number }) => {
    const response = await axios.get(`/photos?albumId=${args.id}`);
    console.log(response);
    return response.data as IPhoto[];
  }
);

export const photosSlice = createSlice({
  name: 'photo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhoto.pending, (state) => {
        state.loadingPhotos = true;
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.loadingPhotos = false;
        state.photo = action.payload;
      });
  },
});

export default photosSlice.reducer;
