import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import heroesApi from 'src/api/requests/heroesApi';
import { HeroStatsModel } from 'src/api/models/HeroStatsModel';
import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  selectInitHeroes,
  selectInitItems,
} from 'src/redux/features/init/InitSelectors';
import { ItemModel } from 'src/api/models/ItemModel';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import ViewHero from 'src/pages/ViewHero/ViewHero';

export interface ViewHeroFullItemsPopularity {
  [key: string]: ItemModel[];
}

export interface ViewHeroState {
  stats: HeroStatsModel | null;
  items: ViewHeroFullItemsPopularity;
  lore: string | null;
}

const ViewHeroContainer: React.FC = () => {
  const params = useParams();
  const heroes = useAppSelector(selectInitHeroes);
  const initItems = useAppSelector(selectInitItems);

  const [inLoading, setIsLoading] = useState(false);
  const [hero, setHero] = useState<ViewHeroState>({
    stats: null,
    items: null,
    lore: null,
  });
  const [lore, setLore] = useState<any>(null);

  const fetchHeroInfo = async () => {
    if (params && params.id && heroes && initItems) {
      setIsLoading(true);
      await heroesApi
        .fetchHeroStats()
        .then((r) => {
          if (r) {
            const stat = r.filter(
              (itm) => itm.hero_id.toString() === params.id,
            );
            setHero((prevState) => {
              return { ...prevState, stats: stat[0] };
            });
          }
        })
        .then(async () => {
          await heroesApi
            .fetchHeroLore()
            .then((r) => {
              setLore(r);
            })
            .then(async () => {
              await heroesApi
                .fetchItemsPopularity(Number(params.id))
                .then((r) => {
                  if (r) {
                    setHero((prevState) => {
                      return {
                        ...prevState,
                        items: {
                          early_game_items: Object.values(
                            r.early_game_items,
                          ).map((itm) => {
                            return Object.values(initItems).find(
                              (i: any) => i.id === itm,
                            ) as ItemModel;
                          }),
                          start_game_items: Object.values(
                            r.start_game_items,
                          ).map((itm) => {
                            return Object.values(initItems).find(
                              (i: any) => i.id === itm,
                            ) as ItemModel;
                          }),
                          mid_game_items: Object.values(r.mid_game_items).map(
                            (itm) => {
                              return Object.values(initItems).find(
                                (i: any) => i.id === itm,
                              ) as ItemModel;
                            },
                          ),
                          late_game_items: Object.values(r.late_game_items).map(
                            (itm) => {
                              return Object.values(initItems).find(
                                (i: any) => i.id === itm,
                              ) as ItemModel;
                            },
                          ),
                        },
                      };
                    });
                  }
                })
                .then(() => setIsLoading(false));
            });
        });
    }
  };
  useEffect(() => {
    if (params && heroes && initItems) {
      fetchHeroInfo();
    }
  }, [heroes, initItems, params]);

  useEffect(() => {
    if (lore) {
      setHero((prevState) => {
        const newKey = hero.stats.localized_name
          .toLowerCase()
          .split(' ')
          .join('_');
        return {
          ...prevState,
          lore: lore[newKey],
        };
      });
    }
  }, [lore]);

  return (
    <section>
      {inLoading && <ScreenLoader />}
      {!inLoading && hero.stats && <ViewHero hero={hero} />}
    </section>
  );
};

export default ViewHeroContainer;
