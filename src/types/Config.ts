import { Dayjs } from "dayjs";

export default interface Config {
  name: string;
  source: {
    sql: string[];
    param: (begin: Dayjs, end: Dayjs) => string[];
    hasAmount: boolean;
  };
  target: {
    type: string;
  };
}

export function getParam(begin: Dayjs, end: Dayjs): string[] {
  return [
    begin.format("YYYY-MM-DD HH:00:00"),
    end.format("YYYY-MM-DD HH:59:59"),
  ];
}
