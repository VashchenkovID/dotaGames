import { RequestStatusEnum } from 'src/utils/enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInit } from 'src/redux/features/init/InitActions';
import { InitHeroModel } from 'src/api/models/InitHeroModel';

export interface HeroesType {
  [key: string]: InitHeroModel;
}

interface InitialStateType {
  heroes: HeroesType;
  items: any;
  regions: any;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: InitialStateType = {
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
        state.heroes = action.payload[1]?.value as {
          [key: string]: InitHeroModel;
        };
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
