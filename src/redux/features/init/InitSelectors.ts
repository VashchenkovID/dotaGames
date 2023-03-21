import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { selectSelf } from 'src/redux/store';

export const selectInitItems = createDraftSafeSelector(
  selectSelf,
  (state) => state.initSlice.items,
);
export const selectInitHeroes = createDraftSafeSelector(
  selectSelf,
  (state) => state.initSlice.heroes,
);
export const selectInitRegions = createDraftSafeSelector(
  selectSelf,
  (state) => state.initSlice.regions,
);
