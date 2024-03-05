// This route returns the text of an advice record
import Advice from '@/model/advice';

export async function GET(req: Request, { params }: { params: { adviceID: string } }) {
  try {
    const result = await Advice.findOne({ adviceSlipID: params.adviceID });
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
