import { SumMode } from "@/constants/SumMode";
import { INITIAL_DATE } from "@/constants/date";
import Datum, { DataKey } from "@/types/Datum";
import SumDatum from "@/types/SumDatum";
import dayjs, { Dayjs } from "dayjs";
import { fetchData } from "./api";

export function getFetchParams(date: Dayjs, mode: SumMode): [Dayjs, Dayjs] {
  switch (mode) {
    case SumMode.YEAR:
      return [dayjs(INITIAL_DATE), dayjs()];
    case SumMode.MONTH:
      return [date.startOf("year"), date.endOf("year")];
    case SumMode.DAY:
      return [date.startOf("month"), date.endOf("month")];
    case SumMode.HOUR:
      return [date.startOf("day"), date.endOf("day")];
  }
}

export async function fetchDataAndSum(
  dataId: string,
  dataKey: DataKey,
  sumMode: SumMode,
  startDate: Dayjs,
  endDate: Dayjs
): Promise<SumDatum[]> {
  const data: Datum[] = await fetchData(
    dataId,
    startDate.format("YYYY-MM-DD"),
    endDate.format("YYYY-MM-DD")
  );
  return sumData(data, dataKey, sumMode);
}

function sumData(
  data: Datum[],
  dataKey: DataKey,
  sumMode: SumMode
): SumDatum[] {
  const result = data.reduce<Record<string, SumDatum>>((acc, datum) => {
    const sumKey = dayjs(datum.date).startOf(sumMode).toISOString();
    if (!acc[sumKey]) {
      acc[sumKey] = { date: datum.date, value: 0 };
    }
    acc[sumKey].value += datum[dataKey] as number;
    return acc;
  }, {});

  return Object.values(result);
}

export function findLongestArray(arrays: any[][]): any[];
export function findLongestArray(arrays: any[][][]): any[];
export function findLongestArray(arrays: any[][] | any[][][]): any[] {
  if (arrays.length === 0) return [];

  if (Array.isArray(arrays[0][0])) {
    let longestArray: any[] = [];
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < (arrays[i] as any[][]).length; j++) {
        if ((arrays[i][j] as any[]).length > longestArray.length) {
          longestArray = arrays[i][j] as any[];
        }
      }
    }
    return longestArray;
  } else {
    let longestArray = arrays[0] as any[];
    for (let i = 1; i < arrays.length; i++) {
      if (arrays[i].length > longestArray.length) {
        longestArray = arrays[i] as any[];
      }
    }
    return longestArray;
  }
}

export function formatDate(date: Dayjs, sumMode: SumMode): string {
  switch (sumMode) {
    case SumMode.YEAR:
      return date.format("YYYY");
    case SumMode.MONTH:
      return date.format("M");
    case SumMode.DAY:
      return date.format("D ddd");
    case SumMode.HOUR:
      return date.format("H");
    default:
      return "ERROR";
  }
}
