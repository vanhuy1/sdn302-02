import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3500";

const initialState = {
    serviceDetail: null,
    services: [],
    isLoading: false,
    errorMessage: "",
};

// POST CREATE Service Item
export const addServiceItem = createAsyncThunk(
    "services/add",
    async (serviceData, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceData),
            });
            if (!response.ok) {
                throw new Error("Failed to add new service item");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all Service Items
export const getAllServiceItems = createAsyncThunk(
    "services/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems`);
            if (!response.ok) {
                throw new Error("Failed to fetch all service items");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET Service Item by ID
export const getServiceItemById = createAsyncThunk(
    "services/getById",
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems/${_id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch service item details");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// UPDATE Service Item by ID
export const updateServiceItem = createAsyncThunk(
    "services/update",
    async ({ _id, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("Failed to update service item");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE Service Item by ID
export const deleteServiceItem = createAsyncThunk(
    "services/delete",
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems/${_id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete service item");
            }
            return _id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ADD Service Items to User
export const addServiceItemsToUser = createAsyncThunk(
    "services/request",
    async ({ userId, serviceItemIds }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, serviceItemIds }),
            });
            if (!response.ok) {
                throw new Error("Failed to add service items to user");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Service Slice
const serviceSlice = createSlice({
    name: "service",
    initialState,
    extraReducers: (builder) => {
        // GET all service items
        builder.addCase(getAllServiceItems.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllServiceItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = action.payload;
        });
        builder.addCase(getAllServiceItems.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // GET service item by ID
        builder.addCase(getServiceItemById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getServiceItemById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serviceDetail = action.payload;
        });
        builder.addCase(getServiceItemById.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // POST new service item
        builder.addCase(addServiceItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addServiceItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services.push(action.payload);
        });
        builder.addCase(addServiceItem.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // UPDATE service item by ID
        builder.addCase(updateServiceItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateServiceItem.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.services.findIndex(
                (service) => service._id === action.payload._id
            );
            if (index !== -1) {
                state.services[index] = action.payload;
            }
        });
        builder.addCase(updateServiceItem.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // DELETE service item by ID
        builder.addCase(deleteServiceItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteServiceItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = state.services.filter(
                (service) => service._id !== action.payload
            );
        });
        builder.addCase(deleteServiceItem.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // POST service items to user
        builder.addCase(addServiceItemsToUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addServiceItemsToUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serviceDetail = action.payload;
        });
        builder.addCase(addServiceItemsToUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
    },
});

// Export selectors
export const selectAllServices = (state) => state.service.services;
export const selectServiceDetail = (state) => state.service.serviceDetail;
export const selectLoading = (state) => state.service.isLoading;
export const selectErrorMessage = (state) => state.service.errorMessage;

export default serviceSlice.reducer;
