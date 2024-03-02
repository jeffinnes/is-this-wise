// This route returns all existing advice and their ratings
import Advice from '@/model/advice';

export async function GET(req: Request) {
  try {
    const result = await Advice.find();
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
