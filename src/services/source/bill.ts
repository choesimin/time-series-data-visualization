import Config from "@/types/Config";

export const bill: Config["source"] = {
  sql: [
    `
      SELECT
        STR_TO_DATE(CONCAT(billing_day, billing_time), '%Y%m%d%H:%i:%s') AS date,
        CAST(billing_price AS SIGNED) AS amount
      FROM payment_ledger
      WHERE billing_day = ?
        AND billing_time >= ? AND billing_time <= ?
    `,
  ],
  param(begin, end) {
    return [
      begin.format("YYYYMMDD"),
      begin.format("HH:00:00"),
      end.format("HH:59:59"),
    ];
  },
  hasAmount: true,
};
