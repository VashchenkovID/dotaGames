import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { browserHistory } from './history/history';
import { setupStore } from './redux/store';
import { setAutoFreeze } from 'immer';
import { AppRouter } from './components/AppRouter';
import Header from 'src/components/Header';
import style from './App.styl';
import { backgrounds } from 'src/utils/config';

const store = setupStore();

const App = () => {
  const random = Math.floor(Math.random() * backgrounds.length);
  const [backgroundState, setBackgroundState] = useState(backgrounds[random]);
  let sliderInterval: any = useRef(null);

  useEffect(() => {
    setAutoFreeze(false);
  }, []);

  useEffect(() => {
    sliderInterval = setInterval(() => {
      setBackgroundState(
        backgrounds[Math.floor(Math.random() * backgrounds.length)],
      );
    }, 30000);
    return () => {
      clearInterval(sliderInterval);
    };
  });
  return (
    <Provider store={store}>
      <ReduxRouter history={browserHistory} store={store}>
        <section
          style={{ backgroundImage: `url(${backgroundState})` }}
          className={style.container}
        >
          <Header />
          <AppRouter />
        </section>
      </ReduxRouter>
    </Provider>
  );
};

export default App;
