import React from 'react';
import styles from './PageTitle.styl';
import cn from 'classnames/bind';

interface IComponentProps {
  text: string;
  className?: string;
}

const cx = cn.bind(styles);

const PageTitle: React.FC<IComponentProps> = ({ text, className }) => {
  return <div className={cx(styles.title, className)}>{text}</div>;
};

export default PageTitle;
