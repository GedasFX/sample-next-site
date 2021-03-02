import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import api from 'src/api';

const SLICE_NAME = 'history';
const sliceApi = api.history();

const thunkActions = {
  fetchAll: createAsyncThunk(`${SLICE_NAME}/fetchAll`, async () => {
    return await sliceApi.fetchAll();
  }),
};

const adapter = createEntityAdapter<Dto.Product>({ selectId: e => e.id });

const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState({ status: 'idle' } as {
    status: 'loading' | 'idle';
    lastSyncTimestamp?: number;
    error?: SerializedError;
  }),
  reducers: {
    add: (state, { payload }: PayloadAction<Dto.Product>) => adapter.addOne(state, payload),
    addMany: (state, { payload }: PayloadAction<Dto.Product[]>) => adapter.addMany(state, payload),
  },
  extraReducers: builder => {
    builder
      .addCase(thunkActions.fetchAll.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(thunkActions.fetchAll.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload);

        state.status = 'idle';
        state.lastSyncTimestamp = Date.now();
      })
      .addCase(thunkActions.fetchAll.rejected, (state, { error }) => {
        state.error = error;

        state.status = 'idle';
        state.lastSyncTimestamp = Date.now();
      });
  },
});

export const historyAdapter = adapter;
export const historySelectors = adapter.getSelectors();
export const historyThunkActions = thunkActions;
export const historyActions = slice.actions;
export default slice.reducer;
