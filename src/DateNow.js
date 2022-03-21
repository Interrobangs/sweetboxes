import { useState } from 'react';
import { useInterval } from './useInterval';
import { getDateNow } from './getDateNow';

export function DateNow() {
  const [date, setDate] = useState([getDateNow()]);
  useInterval(() => {
    setDate(getDateNow(new Date()));
  }, 1000);
  return (
    <div>
      {date}
    </div>
  );
}
