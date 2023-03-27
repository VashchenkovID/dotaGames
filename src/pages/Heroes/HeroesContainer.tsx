import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectInitHeroes } from 'src/redux/features/init/InitSelectors';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from './Heroes.styl';
import HeroesSection from 'src/pages/Heroes/HeroesSection/HeroesSection';
import useRequest from 'src/hooks/useRequest';
import heroesApi from 'src/api/requests/heroesApi';
import { InitHeroModel } from 'src/api/models/InitHeroModel';
import { RequestHeroModel } from 'src/api/models/RequestHeroModel';
import { PrimaryAttrs } from 'src/utils/enum';
import SimpleBar from 'simplebar-react';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';

export interface HeroesCellModel extends InitHeroModel {
  heroListInfo: RequestHeroModel;
}

const HeroesContainer: React.FC = () => {
  const heroes = useAppSelector(selectInitHeroes);
  const [fullHeroes, setFullHeroes] = useState<HeroesCellModel[]>();
  const { load: fetchHeroes, isLoading } = useRequest(
    heroesApi.fetchHeroesList,
    (data) => {
      if (data) {
        setFullHeroes([
          ...data.map((item) => {
            if (heroes) {
              const fullHero = Object.values(heroes).find(
                (h) => h.id === item.id,
              );
              return { ...fullHero, heroListInfo: item };
            }
          }),
        ]);
      }
    },
  );

  useEffect(() => {
    if (heroes) {
      fetchHeroes();
    }
  }, [heroes]);
  return (
    <>
      {isLoading && <ScreenLoader />}
      {!isLoading && (
        <section className={styles.container}>
          <PageTitle text={'Герои'} />
          {fullHeroes && fullHeroes.length > 0 && (
            <SimpleBar style={{ maxHeight: 'calc(100vh - 220px)' }}>
              <HeroesSection
                heroes={fullHeroes.filter(
                  (hero) => hero.heroListInfo.primary_attr === PrimaryAttrs.STR,
                )}
                title={PrimaryAttrs.STR}
              />
              <HeroesSection
                heroes={fullHeroes.filter(
                  (hero) => hero.heroListInfo.primary_attr === PrimaryAttrs.AGI,
                )}
                title={PrimaryAttrs.AGI}
              />
              <HeroesSection
                heroes={fullHeroes.filter(
                  (hero) => hero.heroListInfo.primary_attr === PrimaryAttrs.INT,
                )}
                title={PrimaryAttrs.INT}
              />
            </SimpleBar>
          )}
        </section>
      )}
    </>
  );
};

export default HeroesContainer;
