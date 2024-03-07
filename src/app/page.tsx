import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";
import LoadingRipple from "@/components/ui/loadingRipple/LoadingRipple";
import styles from "./page.module.css";

export default function Home() {
  // temporary state objects
  const [userFullName, setUserFullName] = useState("John Doe");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
    <Card subType="intro-block">
    {userFullName && <h1 >Welcome back {userFullName}!</h1>}
    <p className="intro-text">
      Human history has produced a plethora of advice, but how much of
      it is actually any good? "<span className="bold">Is this wise?</span>"
      is an attempt to crowdsource the answer to that question.
    </p>
    <p className="call-to-action">Check out what others think of the advice below.
      When you're ready to lend a hand, create an account or login and start rating!</p>
  </Card>

  <div className="user-choice">
    <Button link={true} to="'/quick-advice'">
      I'm just here for some free advice.
    </Button>
    {isLoggedIn && (
      <Button link={true} to="'/rate-advice'">
        I'm ready to help!
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
    <aggregate-advice-item v-for="adviceObj in allRatings"
    :key="adviceObj._id"
    :adviceText="adviceObj.adviceText"
    :goodRatings="adviceObj.timesRatedGood"
    :badRatings="adviceObj.timesRatedBad"
    ></aggregate-advice-item>
  </Card>
    </>
  );
}
