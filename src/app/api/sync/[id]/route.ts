import syncWithQueue from "@/services/sync/service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    syncWithQueue(params.id);
    return Response.json("OK");
  } catch (error) {
    console.error("동기화 오류 발생 :", error);
    return Response.json("Fail");
  }
}
