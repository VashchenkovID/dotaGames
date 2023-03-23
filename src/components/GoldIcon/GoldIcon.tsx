import React from 'react';
import gold from '../../assets/goldIcon.png';

interface IComponentProps {
  className?: string;
}

const GoldIcon: React.FC<IComponentProps> = ({ className }) => {
  return <img className={className} src={gold} />;
};

export default GoldIcon;
