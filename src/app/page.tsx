import Image from "next/image";
import Card from "@/components/ui/card/Card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <Card subType="intro-block">
    {/* <h1 v-if="userFullName">Welcome back {{ userFullName }}!</h1> */}
    <p className="intro-text">
      Human history has produced a plethora of advice, but how much of
      it is actually any good? "<span className="bold">Is this wise?</span>"
      is an attempt to crowdsource the answer to that question.
    </p>
    <p className="call-to-action">Check out what others think of the advice below.
      When you're ready to lend a hand, create an account or login and start rating!</p>
  </Card>

  <div className="user-choice">
    <base-button link :to="'/quick-advice'">
      I'm just here for some free advice.
    </base-button>
    <base-button v-if="isLoggedIn" link :to="'/rate-advice'">
      I'm ready to help!
    </base-button>
    <base-button v-else link :to="'/login'">
      Login to start rating!
    </base-button>
  </div>

  <Card subType="rated-advice">
    <base-ripple v-if="isLoading"></base-ripple>
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
