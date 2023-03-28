import React from 'react';
import { ViewLeagueState } from 'src/pages/ViewLeague/ViewLeagueContainer';
import styles from './ViewLeague.styl';
import cn from 'classnames/bind';
import PageTitle from 'src/components/PageTitle/PageTitle';
import ViewLeagueMatches from 'src/pages/ViewLeague/ViewLeagueMatches/ViewLeagueMatches';
import ViewLeagueTeams from 'src/pages/ViewLeague/ViewLeagueTeams/ViewLeagueTeams';
import { useResize } from 'src/hooks/useResize';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  league: ViewLeagueState;
}

const cx = cn.bind(styles);

const ViewLeague: React.FC<IComponentProps> = ({ league }) => {
  const { width } = useResize();
  return (
    <div className={styles.container}>
      <PageTitle text={league.league.name} />
      <div className={styles.tier}>
        Ранг: <span className={styles.tier__title}>{league.league.tier}</span>
      </div>
      {width <= 1030 ? (
        <SimpleBar className={styles.simpleBar}>
          <section
            className={cx(styles.container__body, {
              smallScreen: width <= 1030,
            })}
          >
            <ViewLeagueMatches matches={league.matches} teams={league.teams} />
            <ViewLeagueTeams
              teams={league.teams
                .sort((a, b) => {
                  return b.rating - a.rating;
                })
                .filter((team) => team.name !== null && team.name !== '')}
            />
          </section>
        </SimpleBar>
      ) : (
        <section
          className={cx(styles.container__body, {
            smallScreen: width <= 1030,
          })}
        >
          <ViewLeagueMatches matches={league.matches} teams={league.teams} />
          <ViewLeagueTeams
            teams={league.teams
              .sort((a, b) => {
                return b.rating - a.rating;
              })
              .filter((team) => team.name !== null && team.name !== '')}
          />
        </section>
      )}
    </div>
  );
};

export default ViewLeague;
