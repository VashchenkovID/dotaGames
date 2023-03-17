import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKeysEnum, RequestStatusEnum } from 'src/utils/enum';
import { fetchAuthUser } from './actions';
import { IAllListsEmployees, IAuthUserData } from './types';

const initialState: IAllListsEmployees = {
  entities: null,
  status: RequestStatusEnum.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<RequestStatusEnum>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAuthUser.fulfilled,
      (state, action: PayloadAction<IAuthUserData>) => {
        localStorage.setItem(LocalStorageKeysEnum.TOKEN, action.payload.token);
        localStorage.setItem(LocalStorageKeysEnum.ID, action.payload.id);
        state.entities = action.payload;
        state.status = RequestStatusEnum.FULFILLED;
        state.error = null;
      },
    );
    builder.addCase(fetchAuthUser.pending, (state) => {
      state.entities = null;
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
    });
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      state.entities = null;
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.error.message ?? 'Ошибка';
    });
  },
});

export const { setStatus } = authSlice.actions;
export default authSlice.reducer;
