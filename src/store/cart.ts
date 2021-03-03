import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME = 'cart';

const adapter = createEntityAdapter<Dto.Product>();

const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    add: (state, { payload }: PayloadAction<Dto.Product>) => adapter.addOne(state, payload),
    addMany: (state, { payload }: PayloadAction<Dto.Product[]>) => adapter.addMany(state, payload),

    remove: (state, { payload }: PayloadAction<string | number>) =>
      adapter.removeOne(state, payload),
    removeMany: (state, { payload }: PayloadAction<(string | number)[]>) =>
      adapter.removeMany(state, payload),
    clear: state => adapter.removeAll(state),
  },
});

export const cartAdapter = adapter;
export const cartSelectors = adapter.getSelectors();
export const cartActions = slice.actions;
export default slice.reducer;
