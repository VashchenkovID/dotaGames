export const durationConverter = (duration: number) => {
  const minutes = (duration / 60).toFixed(2);
  const seconds = minutes.split('.');
  if (Number(seconds[1]) >= 60) {
    const time = `${(Number(minutes) + 1).toFixed(0)}:${
      Number(seconds[1]) - 60
    }`;
    if (Number(minutes) + 1 >= 60) {
      if (time.length === 4) {
        const strFirst = time.slice(0, 3); //Первые два символа
        const strLast = time.slice(3); // Последние два символа
        return `1:${strFirst}0${strLast}`;
      } else return time;
    }
    if (time.length === 4) {
      const strFirst = time.slice(0, 3); //Первые два символа
      const strLast = time.slice(3); // Последние два символа
      return `${strFirst}0${strLast}`;
    } else return time;
  } else return `${Number(minutes).toFixed(0)}:${Number(seconds[1])}`;
};
export const converterInThousand = (num: number) => {
  if (num.toString().length >= 5) {
    return (num / 1000).toFixed(1) + 'k';
  } else return num.toString();
};
