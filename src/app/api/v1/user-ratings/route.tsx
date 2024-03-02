// This route returns all ratings by a user
import User from '@/model/user';

export async function GET(req: Request) {
  // todo This needs to be updated to reflect using NextAuth instead of Passport once auth has been implemented
  User.findById(req.session.passport.user, 'ratingHistory')
    .then((result) => {
      return Response.json(result);
    })
    .catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    });
}
