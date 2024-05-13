import Datum from "@/types/Datum";

export async function fetchData(
  id: string,
  startDate: string,
  endDate: string
): Promise<Datum[]> {
  try {
    const response = await fetch(
      `/api/get/${id}?begin=${startDate}&end=${endDate}`
    );
    if (!response.ok) throw new Error("통신 응답 수신 실패");
    return response.json();
  } catch (error) {
    console.error("자료 조회 실패 :", error);
    throw error;
  }
}

export async function syncData(id: string): Promise<void> {
  try {
    const response = await fetch("/api/sync/" + id);
    if (!response.ok) throw new Error("통신 응답 수신 실패");
  } catch (error) {
    console.error("자료 동기화 실패 :", error);
    throw error;
  }
}
