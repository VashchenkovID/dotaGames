import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IRouteItem, PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';

import PrivateRoute from 'src/components/PrivateRoute';
import ShopPage from 'src/pages/ShopPage/ShopPage';
import MainPage from 'src/pages/MainPage/MainPage';

export const publicRoutes: Array<IRouteItem> = [
  {
    path: PublicRoutesEnum.SHOP,
    element: <ShopPage />,
  },
  {
    path: PublicRoutesEnum.GENERAL,
    element: <MainPage />,
  },
  { path: `${PublicRoutesEnum.VIEW_CAKE}/:id`, element: <div></div> },
  { path: PublicRoutesEnum.INFO_PAGE, element: <div></div> },
];

export const privateRoutes: Array<IRouteItem> = [
  { path: PrivateRoutesEnum.ADMINISTRATION, element: <div></div> },
  { path: PrivateRoutesEnum.BASKET, element: <div></div> },
  { path: PrivateRoutesEnum.CREATE_CAKE, element: <div></div> },
  { path: PrivateRoutesEnum.EDIT_CAKE, element: <div></div> },
];

const AppRouter = () => {
  const isAuth = true;
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PublicRoutesEnum.GENERAL} />} />

        {[...publicRoutes, ...(isAuth ? privateRoutes : [])].map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={<Navigate to={PublicRoutesEnum.GENERAL} />}
          />
          {privateRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Route>

        <Route
          path="*"
          element={<Navigate to={PublicRoutesEnum.INFO_PAGE} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
