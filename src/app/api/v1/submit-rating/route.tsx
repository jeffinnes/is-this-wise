// This route submits a rating to an advice record
import User from '@/model/user';
import Advice from '@/model/advice';

export async function POST(req: Request) {
  const body = await req.json();
  // Record users rating to their history
  // todo This needs to be updated to reflect using NextAuth instead of Passport once auth has been implemented
  await User.updateOne(
    { _id: req.session.passport.user },
    {
      $push: {
        ratingHistory: {
          adviceSlipID: body.adviceID,
          rating: body.submittedRating,
        },
      },
    }
  );

  // Update the raitings Good/Bad totals
  if (body.submittedRating === 'good') {
    // Save the good rating or create a new advice document with first rating
    await Advice.findOneAndUpdate({ adviceSlipID: body.adviceID }, { $inc: { timesRatedGood: 1 } })
      .then((result) => {
        if (!result) {
          new Advice({
            adviceSlipID: body.adviceID,
            adviceText: body.adviceText,
            timesRatedGood: 1,
            timesRatedBad: 0,
          })
            .save()
            .then(() => {
              console.info(`Saved rating for --> ${body.adviceID}`);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // Save the bad rating or create a new advice document with first rating
    await Advice.findOneAndUpdate({ adviceSlipID: body.adviceID }, { $inc: { timesRatedBad: 1 } })
      .then((result) => {
        if (!result) {
          new Advice({
            adviceSlipID: body.adviceID,
            adviceText: body.adviceText,
            timesRatedGood: 0,
            timesRatedBad: 1,
          })
            .save()
            .then(() => {
              console.info(`Saved rating for --> ${body.adviceID}`);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return Response.json({ status: 200 });
}
