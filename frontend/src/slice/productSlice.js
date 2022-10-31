import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "./api";
import { toast } from "react-toastify";

const initialState = {
  item: [],
  status: null,
  createProduct: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/products`, values);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducer: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.item = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createstatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.item.puch();
      state.createstatus = "success";
    },
    [productsCreate.rejected]: (state, action) => {
      state.createstatus = "rejected";
    },
  },
});

export default productSlice.reducer;
