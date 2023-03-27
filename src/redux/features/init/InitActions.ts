import { createAsyncThunk } from '@reduxjs/toolkit';
import initApi from 'src/api/requests/initApi';

export const fetchInit = createAsyncThunk(
  'fetchInit',
  async (_, createAsyncThunk) => {
    try {
      const models = [
        await initApi.fetchInit('items'),
        await initApi.fetchInit('heroes'),
        await initApi.fetchInit('region'),
      ];

      return await Promise.allSettled(models);
    } catch (error) {
      return createAsyncThunk.rejectWithValue('Ошибка при запросе товаров!');
    }
  },
);
