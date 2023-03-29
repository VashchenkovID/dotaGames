import React from 'react';
import styles from './MainPage.styl';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import PageTitle from 'src/components/PageTitle/PageTitle';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.container}>
      <PageTitle text={'Добро пожаловать'} />
      <p className={styles.title}>
        Данный сервис предназначен для просмотра актуальной статистики по Dota 2
      </p>
      <div className={styles.actions}>
        <Button
          variant={'contained'}
          color={'primary'}
          size={'large'}
          onClick={() => navigate(PublicRoutesEnum.MATCHES)}
        >
          Матчи
        </Button>
        <Button
          size={'large'}
          variant={'contained'}
          color={'primary'}
          onClick={() => navigate(PublicRoutesEnum.TEAMS)}
        >
          Команды
        </Button>
      </div>
    </section>
  );
};

export default MainPage;
