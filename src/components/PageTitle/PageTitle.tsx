import React from 'react';
import styles from './PageTitle.styl';

interface IComponentProps {
  text: string;
}

const PageTitle: React.FC<IComponentProps> = ({ text }) => {
  return <div className={styles.title}>{text}</div>;
};

export default PageTitle;
