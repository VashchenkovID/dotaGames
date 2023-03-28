import React from 'react';
import styles from './PageTitle.styl';
import cn from 'classnames/bind';
import { useResize } from 'src/hooks/useResize';

interface IComponentProps {
  text: string;
  className?: string;
}

const cx = cn.bind(styles);

const PageTitle: React.FC<IComponentProps> = ({ text, className }) => {
  const { width } = useResize();
  return (
    <div
      className={cx(styles.title, className, {
        smallScreen: width <= 500,
      })}
    >
      {text}
    </div>
  );
};

export default PageTitle;
