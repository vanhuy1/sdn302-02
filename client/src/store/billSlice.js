import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const API_URL = "http://localhost:3500";

const initialState = {
  bills: [],
  billDetail: null,
  loading: false,
  error: null,
};

export const fetchBills = createAsyncThunk(
  "bills/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/bill`);
      // const response = await apiSlice.endpoints.fetchBills.initiate();

      // console.log("Endpoint: " + apiSlice.endpoints)
      // console.log("Fetch Bill Endpoint: " + apiSlice.endpoints.fetchBills)

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch bills");
      }
      // return response.data;

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBillDetail = createAsyncThunk(
  "bills/fetchBillDetail",
  async (billId, { rejectWithValue }) => {
    try {
      // const response = await fetch(`${API_URL}/bill/${billId}`);

      const response = await apiSlice.endpoints.fetchBillDetail.initiate(billId);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch bill details");
      // }

      // return await response.json();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBillDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBillDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.billDetail = action.payload;
      })
      .addCase(fetchBillDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default billSlice.reducer;
