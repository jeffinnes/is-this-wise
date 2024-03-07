import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/button/Button';
import LoadingRipple from '@/components/ui/loadingRipple/LoadingRipple';
import AggregateAdviceItem from '@/components/advice/aggregateAdviceItem/AggregateAdviceItem';
import styles from './page.module.css';

// Temporary advice data

export default function Home() {
  // temporary state objects
  const [userFullName, setUserFullName] = useState('John Doe');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // temporary advice data
  const allRatings = [
    {
      _id: 1,
      adviceText: 'lorem ipsum',
      goodRatings: 4,
      badRatings: 2,
    },
    {
      _id: 2,
      adviceText: 'lorem ipsum',
      goodRatings: 7,
      badRatings: 2,
    },
    {
      _id: 3,
      adviceText: 'lorem ipsum',
      goodRatings: 10,
      badRatings: 10,
    },
    {
      _id: 4,
      adviceText: 'lorem ipsum',
      goodRatings: 7,
      badRatings: 20,
    },
  ];

  return (
    <>
      <Card subType="intro-block">
        {userFullName && <h1>Welcome back {userFullName}!</h1>}
        <p className="intro-text">
          Human history has produced a plethora of advice, but how much of it is actually any good?
          &quot;<span className="bold">Is this wise?</span>&quot; is an attempt to crowdsource the
          answer to that question.
        </p>
        <p className="call-to-action">
          Check out what others think of the advice below. When you&apos;re ready to lend a hand,
          create an account or login and start rating!
        </p>
      </Card>

      <div className="user-choice">
        <Button link={true} to="'/quick-advice'">
          I&apos;m just here for some free advice.
        </Button>
        {isLoggedIn && (
          <Button link={true} to="'/rate-advice'">
            I&apos;m ready to help!
          </Button>
        )}
        {!isLoggedIn && (
          <Button link={true} to="'/login'">
            Login to start rating!
          </Button>
        )}
      </div>

      <Card subType="rated-advice">
        {loading && <LoadingRipple></LoadingRipple>}
        {allRatings.length == 0 && !loading && <p>No advice yet. Be the first!</p>}
        {allRatings.length > 0 &&
          !loading &&
          allRatings.map((adviceObj) => (
            <AggregateAdviceItem
              key={adviceObj._id}
              adviceText={adviceObj.adviceText}
              goodRatings={adviceObj.goodRatings}
              badRatings={adviceObj.badRatings}
            ></AggregateAdviceItem>
          ))}
      </Card>
    </>
  );
}
