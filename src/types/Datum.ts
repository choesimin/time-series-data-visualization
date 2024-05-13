import { Dayjs } from "dayjs";

export default interface Datum {
  date: Dayjs;
  count: number;
  amount?: number;
}

export type DataKey = keyof Omit<Datum, "date">;
