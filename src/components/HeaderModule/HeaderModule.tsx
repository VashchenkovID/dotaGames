import React from 'react';
import { HeaderItem } from 'src/components/Header/Header';
import styles from './HeaderModule.styl';
import cn from 'classnames/bind';

interface IComponentProps {
  item: HeaderItem;
  isSidebar?: boolean;
}

const cx = cn.bind(styles);

const HeaderModule: React.FC<IComponentProps> = ({ item, isSidebar }) => {
  return (
    <li
      className={cx(styles.container, {
        active: item.active,
        isSidebar: isSidebar && item.active,
      })}
      onClick={item.onClick}
    >
      {item.label}
    </li>
  );
};

export default HeaderModule;
