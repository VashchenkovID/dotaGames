import React from 'react';
import { ViewHeroState } from 'src/pages/ViewHero/ViewHeroContainer';
import styles from './ViewHeroStats.styl';
import { HeroRolesRus, TypeAttackRUS } from 'src/utils/enum';
import SimpleBar from 'simplebar-react';
import cn from 'classnames/bind';
import { useResize } from 'src/hooks/useResize';

interface IComponentProps {
  hero: ViewHeroState;
}

const cx = cn.bind(styles);

const ViewHeroStats: React.FC<IComponentProps> = ({ hero }) => {
  const { width } = useResize();
  const heroStatsItems = [
    {
      title: 'Базовое здоровье',
      value: hero.stats.base_health,
      color: '#BBDD00',
    },
    {
      title: 'Базовая регенерация здоровья',
      value: hero.stats.base_health_regen,
      color: '#BBDD00',
    },
    {
      title: 'Базовый запас маны',
      value: hero.stats.base_mana,
      color: '#7B86F3FF',
    },
    {
      title: 'Базовая регенерация маны',
      value: hero.stats.base_mana_regen,
      color: '#7B86F3FF',
    },
    {
      title: 'Базовый урон',
      value: hero.stats.base_attack_max,
      color: '#EECD00',
    },
    {
      title: 'Базовая скорость атаки',
      value: hero.stats.base_attack_time,
      color: '#EECD00',
    },
    {
      title: 'Базовый радиус атаки',
      value: hero.stats.attack_range,
      color: '#EECD00',
    },
    {
      title: 'Базовая броня',
      value: hero.stats.base_armor,
      color: '#EECD00',
    },
  ];
  const url = process.env.REACT_APP_API_URL_IMAGE;
  return (
    <div
      className={cx(styles.hero, {
        smallScreen: width <= 1030,
      })}
    >
      <div className={styles.hero__leftSide}>
        <img className={styles.img} src={`${url}${hero.stats.img}`} />
        <span className={styles.typeAttack}>
          {TypeAttackRUS[hero.stats.attack_type]}
        </span>
        <ul className={styles.statsList}>
          {heroStatsItems.map((item, index) => (
            <li key={index}>
              {item.title} :{' '}
              <span style={{ color: item.color }}>{item.value}</span>
            </li>
          ))}
        </ul>
        <div>
          <span className={styles.roles}>Роли: </span>
          {hero.stats.roles.map((role) => HeroRolesRus[role]).join(', ')}
        </div>
      </div>
      <div className={styles.hero__rightSide}>
        <SimpleBar style={{ maxHeight: 'calc(100vh - 320px)', minWidth: 400 }}>
          <span>{hero.lore}</span>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ViewHeroStats;
