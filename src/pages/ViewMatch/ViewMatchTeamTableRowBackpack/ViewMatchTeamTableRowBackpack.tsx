import React, { useMemo } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectInitItems } from 'src/redux/features/init/InitSelectors';
import styles from './ViewMatchTeamTableRowBackpack.styl';
import BackpackIcon from 'src/components/BackpackIcon/BackpackIcon';
import GoldIcon from 'src/components/GoldIcon/GoldIcon';
import { useResize } from 'src/hooks/useResize';
import cn from 'classnames/bind';

interface IComponentProps {
  backpackItems: { items: number[]; backpack: number[]; neutral: number };
  gold: number;
}

const cx = cn.bind(styles);

const ViewMatchTeamTableRowBackpack: React.FC<IComponentProps> = ({
  backpackItems,
  gold,
}) => {
  const items = useAppSelector(selectInitItems);
  const url = process.env.REACT_APP_API_URL_IMAGE;
  const neutralItem: any = useMemo(() => {
    if (items) {
      return Object.values(items).find(
        (item: any) => backpackItems.neutral === item.id,
      );
    } else return undefined;
  }, [backpackItems]);

  const { width } = useResize();

  return (
    <div
      className={cx(styles.backpack, {
        smallScreen: width <= 1030,
      })}
    >
      <div className={styles.container}>
        <div
          className={cx(styles.itemsContainer, {
            smallScreen: width <= 1030,
          })}
        >
          {items &&
            backpackItems.items.map((id, index) => {
              const item: any = items
                ? Object.values(items).find((itm: any) => itm.id === id)
                : undefined;
              return (
                <div key={index}>
                  {item !== null && item !== undefined ? (
                    <img
                      className={styles.cellFull}
                      src={`${url}${item?.img}`}
                    />
                  ) : (
                    <div className={styles.voidCell}></div>
                  )}
                </div>
              );
            })}
        </div>
        <div className={styles.itemsContainer}>
          {width > 1000 && <BackpackIcon />}
          {backpackItems.backpack.map((id, idx) => {
            const item: any = Object.values(items).find(
              (itm: any) => itm.id === id,
            );
            return (
              <div key={idx}>
                {item ? (
                  <img className={styles.cellFull} src={`${url}${item?.img}`} />
                ) : (
                  <div className={styles.voidCell}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {neutralItem ? (
          <img
            className={styles.cellNeutralFull}
            src={`${url}${neutralItem?.img}`}
          />
        ) : (
          <div className={styles.voidNeutralCell}></div>
        )}
        <div className={styles.goldCell}>
          {gold}
          <GoldIcon className={styles.goldImg} />
        </div>
      </div>
    </div>
  );
};

export default ViewMatchTeamTableRowBackpack;
