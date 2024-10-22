import "dotenv/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL;

const initialState = {
    staffDetail: null,
    staffs: [],
    isLoading: false,
    errorMessage: "",
};

// POST CREATE booking
export const addStaff = createAsyncThunk(
    "manage/staff/add",
    async (staffData, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(staffData),
            });
            if (!response.ok) {
                throw new Error("Failed to add new staff");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all staffs
export const getAllStaffs = createAsyncThunk(
    "manage/staff/getAllStaffs",
    async (thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to get all staffs");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET staff by staffId
export const getStaffById = createAsyncThunk(
    "manage/staff/getStaffById",
    async (_staffId, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/manage/staffs/${_staffId}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get staff detail!");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// PUT a staff by staffId
export const updateStaff = createAsyncThunk(
    "manage/staff/edit",
    async ({ _staffId, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/manage/staffs/${_staffId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update staff!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE a staff by staffId
export const deleteStaff = createAsyncThunk(
    "manage/staff/delete",
    async (_staffId, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/manage/staffs/${_staffId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete staff!");
            }

            return _staffId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Staff slice
const staffSlice = createSlice({
    name: "staff",
    initialState,
    extraReducers: (builder) => {
        // GET all staffs
        builder.addCase(getAllStaffs.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllStaffs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffs = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });

        // GET staff by staff Id
        builder.addCase(getStaffById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStaffById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffDetail = action.payload;
        });
        builder.addCase(getStaffById.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });

        // POST new staff
        builder.addCase(addStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffs.push(action.payload);
        });
        builder.addCase(addStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });

        // PUT staff by Id
        builder.addCase(updateStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.staffs.findIndex(
                (staff) => staff._staffId === action.payload.staffId
            );
            if (index !== -1) {
                state.staffs[index] = action.payload;
            }
        });
        builder.addCase(updateStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });

        // DELETE staff by Id
        builder.addCase(deleteStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bookings = state.bookings.filter(
                (booking) => booking.id !== action.payload
            );
        });
        builder.addCase(deleteStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// Export the state selectors
export const selectAllStaffs = (state) => state.staff.staffs;
export const selectLoading = (state) => state.staff.isLoading;
export const selectErrorMessage = (state) => state.staff.errorMessage;

export default staffSlice.reducer;
