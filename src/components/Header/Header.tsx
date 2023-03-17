import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

import { HeaderIdEnum } from 'src/utils/enum';

const cx = cn.bind(styles);

interface Item {
  label: string;
  id: string;
  href?: string;
  active?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  target?: string;
  permission: number[];
}

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const myLoc = `/${location.pathname.split('/').slice(1, 2).join('')}`;

  const items: Item[] = [
    {
      label: 'Справочники',
      id: HeaderIdEnum.DIRECTORIES,
      href: PublicRoutesEnum.SHOP,
      active: myLoc === PublicRoutesEnum.SHOP,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.SHOP);
      },
      permission: [],
    },
  ];

  const headerTransition = (e: React.MouseEvent, patch: string) => {
    e.preventDefault();
    navigate(patch);
  };

  return <div>11</div>;
};

export default Header;
