import { useState } from 'react';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import LoadingRipple from '@/components/ui/loadingRipple/LoadingRipple';
import styles from './quickAdvice.module.css';

export default function QuickAdvice() {
  const [advice, setAdvice] = useState('');
  const [canRequest, setCanRequest] = useState(true);

  function requestDelay() {
    setTimeout(() => {
      setCanRequest(true);
    }, 9000);
  }

  async function handleGetAdvice() {
    try {
      setCanRequest(false);

      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json(); // In the Vue app I had to JSON.parse(response.text). But that might have been due to superagent
      setAdvice(data.slip.advice);
      requestDelay();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card subType="introBlock">
        <h1>Looking for some advice?</h1>
      </Card>

      <Card subType="adviceCard">
        <div className={styles.adviceContainer}>
          {!canRequest && <LoadingRipple />}
          {canRequest && <span>{advice}</span>}
        </div>

        <div className="user-choice">
          {canRequest && <Button onClick={handleGetAdvice}>More Please!</Button>}
          {!canRequest && (
            <div>
              <p className="cooldown">Receiving wisdom from the ancients</p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
