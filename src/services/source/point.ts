import Config, { getParam } from "@/types/Config";

function getCommonQueries(condition: string): string[] {
  return [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ].map(
    (suffix) =>
      `
        SELECT
          reg_dt AS date,
          ABS(point + extra_point) AS amount
        FROM point_usage_${suffix}
        WHERE reg_dt >= ? AND reg_dt <= ? AND ${condition}
      `
  );
}

export const pointUse: Config["source"] = {
  sql: getCommonQueries("(point > 0 OR extra_point > 0)"),
  param: getParam,
  hasAmount: true,
};

export const pointUseCancel: Config["source"] = {
  sql: getCommonQueries("(point < 0 OR extra_point < 0)"),
  param: getParam,
  hasAmount: true,
};
