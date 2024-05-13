import Config, { getParam } from "@/types/Config";

export const merchantRegistration: Config["source"] = {
  sql: [
    `
      SELECT
        reg_dt AS date
      FROM merchant
      WHERE reg_dt >= ? AND reg_dt <= ?
    `,
  ],
  param: getParam,
  hasAmount: false,
};

export const userRegistration: Config["source"] = {
  sql: [
    `
      SELECT
        reg_dt AS date
      FROM user_info
      WHERE reg_dt >= ? AND reg_dt <= ?
    `,
  ],
  param: getParam,
  hasAmount: false,
};
