import { RequestStatusEnum } from 'src/utils/enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShopItems } from 'src/redux/features/shop/actions';
import { fetchInit } from 'src/redux/features/init/InitActions';

const initialState: any = {
  items: null,
  heroes: null,
  regions: null,
  status: RequestStatusEnum.IDLE,
  error: null,
};

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchInit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.items = action.payload[0]?.value;
        state.heroes = action.payload[1]?.value;
        state.regions = Object.values(action.payload[2]?.value).map(
          (reg, index) => {
            return { id: index, name: reg };
          },
        );
        state.status = RequestStatusEnum.FULFILLED;
        state.error = null;
      },
    );
    builder.addCase(fetchInit.pending, (state) => {
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
    });
    builder.addCase(fetchInit.rejected, (state, action) => {
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.error.message ?? 'Ошибка';
    });
  },
});

export default initSlice.reducer;
