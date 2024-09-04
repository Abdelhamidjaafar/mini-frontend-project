import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchJobs } from '../api/hrflowApi';

export const getJobs = createAsyncThunk('jobs/getJobs', async () => {
    const response = await fetchJobs();
    return response.data;
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});



let red = jobsSlice.reducer;
export default red;
