import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

import { HeaderIdEnum } from 'src/utils/enum';
import HeaderModule from 'src/components/HeaderModule/HeaderModule';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Drawer, IconButton } from '@material-ui/core';
import { useResize } from 'src/hooks/useResize';

export interface HeaderItem {
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

  const items: HeaderItem[] = [
    {
      label: 'Главная',
      id: HeaderIdEnum.GENERAL,
      href: PublicRoutesEnum.GENERAL,
      active: myLoc === PublicRoutesEnum.GENERAL,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.GENERAL);
      },
      permission: [],
    },
    {
      label: 'Профессиональные матчи',
      id: HeaderIdEnum.MATCHES,
      href: PublicRoutesEnum.MATCHES,
      active: myLoc === PublicRoutesEnum.MATCHES,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.MATCHES);
      },
      permission: [],
    },
    {
      label: 'Команды',
      id: HeaderIdEnum.TEAMS,
      href: PublicRoutesEnum.TEAMS,
      active: myLoc === PublicRoutesEnum.TEAMS,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.TEAMS);
      },
      permission: [],
    },
    {
      label: 'Лиги',
      id: HeaderIdEnum.LEAGUES,
      href: PublicRoutesEnum.LEAGUES,
      active: myLoc === PublicRoutesEnum.LEAGUES,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.LEAGUES);
      },
      permission: [],
    },
    {
      label: 'Игроки',
      id: HeaderIdEnum.PLAYERS,
      href: PublicRoutesEnum.PLAYERS,
      active: myLoc === PublicRoutesEnum.PLAYERS,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.PLAYERS);
      },
      permission: [],
    },
    {
      label: 'Персонажи',
      id: HeaderIdEnum.CHARACTERS,
      href: PublicRoutesEnum.HEROES,
      active: myLoc === PublicRoutesEnum.HEROES,
      onClick: (e) => {
        headerTransition(e, PublicRoutesEnum.HEROES);
      },
      permission: [],
    },
  ];

  const headerTransition = (e: React.MouseEvent, patch: string) => {
    e.preventDefault();
    navigate(patch);
  };
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useResize();

  return (
    <div className={styles.Header}>
      {width <= 800 ? (
        <div>
          <IconButton
            size={'medium'}
            onClick={() => setIsOpen(true)}
            color={'inherit'}
          >
            <DehazeIcon fontSize={'large'} />
          </IconButton>
          <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            {items.map((item, index) => (
              <li
                key={index}
                className={styles.sidebarLink}
                onClick={() => setIsOpen(false)}
              >
                <HeaderModule item={item} isSidebar />
              </li>
            ))}
          </Drawer>
        </div>
      ) : (
        <nav className={styles.Header}>
          {items.map((item, index) => (
            <HeaderModule item={item} key={index} isSidebar={false} />
          ))}
          <a className={styles.href} href={'https://docs.opendota.com/'}>
            Документация API
          </a>
        </nav>
      )}
    </div>
  );
};

export default Header;
