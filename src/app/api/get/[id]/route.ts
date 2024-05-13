import get from "@/services/query/service";
import dayjs from "dayjs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);

  const beginDateString: string = url.searchParams.get("begin") as string;
  const endDateString: string = url.searchParams.get("end") as string;

  const data: any[] = await get(
    params.id,
    dayjs(beginDateString).startOf("day"),
    dayjs(endDateString).endOf("day")
  );
  return Response.json(data);
}
