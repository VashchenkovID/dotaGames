import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IRouteItem, PublicRoutesEnum } from 'src/router';
import ShopPage from 'src/pages/ShopPage/ShopPage';
import MainPage from 'src/pages/MainPage/MainPage';
import MatchesContainer from 'src/pages/Matches/MatchesContainer';
import ViewMatchContainer from 'src/pages/ViewMatch/ViewMatchContainer';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { fetchInit } from 'src/redux/features/init/InitActions';
import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  selectInitHeroes,
  selectInitItems,
  selectInitRegions,
} from 'src/redux/features/init/InitSelectors';

export const publicRoutes: Array<IRouteItem> = [
  {
    path: PublicRoutesEnum.SHOP,
    element: <ShopPage />,
  },
  {
    path: PublicRoutesEnum.GENERAL,
    element: <MainPage />,
  },
  {
    path: PublicRoutesEnum.MATCHES,
    element: <MatchesContainer />,
  },
  {
    path: PublicRoutesEnum.TEAMS,
    element: <></>,
  },
  {
    path: PublicRoutesEnum.HEROES,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.MATCH}/:id`,
    element: <ViewMatchContainer />,
  },
  {
    path: `${PublicRoutesEnum.TEAM}/:id`,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.HERO}/:id`,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.PLAYER}/:id`,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.LEAGUE}/:id`,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.LEAGUES}`,
    element: <></>,
  },
  {
    path: `${PublicRoutesEnum.PLAYERS}`,
    element: <></>,
  },
  { path: PublicRoutesEnum.INFO_PAGE, element: <div></div> },
];

const AppRouter = () => {
  const heroes = useAppSelector(selectInitHeroes);
  const items = useAppSelector(selectInitItems);
  const regoins = useAppSelector(selectInitRegions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInit());
  }, []);
  console.log(heroes, items, regoins);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PublicRoutesEnum.GENERAL} />} />

        {publicRoutes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route
          path="*"
          element={<Navigate to={PublicRoutesEnum.INFO_PAGE} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
