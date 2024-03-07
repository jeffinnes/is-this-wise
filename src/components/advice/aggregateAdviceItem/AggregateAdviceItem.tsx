// This component displays an advice item with an aggregate score
import { useState } from 'react';
import styles from './AggregateAdviceItem.module.css';

function getGoodPercent(goodRatings: number, badRatings: number) {
  const num = goodRatings / (goodRatings + badRatings);
  return Math.round((num + Number.EPSILON) * 100);
}

function getBadPercent(goodRatings: number, badRatings: number) {
  const num = badRatings / (goodRatings + badRatings);
  return Math.round((num + Number.EPSILON) * 100);
}

export default function AggregateAdviceItem({
  adviceText,
  goodRatings,
  badRatings,
}: {
  adviceText: string;
  goodRatings: number;
  badRatings: number;
}) {
  // ! I might not actually need useState here
  const [goodPercent, setGoodPercent] = useState(getGoodPercent(goodRatings, badRatings));
  const [badPercent, setBadPercent] = useState(getBadPercent(goodRatings, badRatings));

  function goodBarShift() {
    const colorStopGood = goodPercent - 1;
    const colorStopMid = goodPercent;
    const colorStopBad = goodPercent + 1;

    return {
      background: `linear-gradient(90deg, rgba(26,102,26,1) 0%, rgba(26,102,26,0.85) ${colorStopGood}%, rgba(255,255,255,0) ${colorStopMid}%, rgba(178,34,34,0.85) ${colorStopBad}%, rgba(178,34,34,1) 100%)`,
    };
  }

  return (
    <>
      <div className={styles.aggAdviceItem}>
        <p className={styles.adviceText}>{adviceText}</p>
        <div className={styles.aggBarRow}>
          <div className={styles.aggBar} style={goodBarShift()}></div>
        </div>
        <div className={styles.labels}>
          <p>Good ({goodRatings})</p>
          <p>Bad ({badRatings})</p>
        </div>
        <div className={styles.total}>
          <p>Total Ratings: {goodRatings + badRatings}</p>
        </div>
      </div>
    </>
  );
}
