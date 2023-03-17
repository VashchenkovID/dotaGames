export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum RoutesParamsEnum {
  ID = '/:id',
}

export const enum PrivateRoutesEnum {
  ADMINISTRATION = '/administration',
  BASKET = '/directories',
  CREATE_CAKE = '/create-cake',
  EDIT_CAKE = '/edit-cake',
}

export const enum PublicRoutesEnum {
  INFO_PAGE = '/info',
  GENERAL = '/general',
  SHOP = '/shop',
  VIEW_CAKE = '/shop/view',
}
