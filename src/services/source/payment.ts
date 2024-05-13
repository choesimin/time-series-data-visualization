import Config, { getParam } from "@/types/Config";

const commonQuery: string = `
  SELECT
    approval_origin_dt AS date,
    CAST(approval_price AS UNSIGNED) AS amount
  FROM payment_ledger
  WHERE approval_origin_dt >= ? AND approval_origin_dt <= ?
    AND approval_state IN ('F', 'C')
`;

export const payment: Config["source"] = {
  sql: [commonQuery],
  param: getParam,
  hasAmount: true,
};

export const paymentCancel: Config["source"] = {
  sql: [
    `
      SELECT
        approval_dt AS date,
        CAST(approval_price AS UNSIGNED) AS amount
      FROM payment_ledger
      WHERE approval_dt >= ? AND approval_dt <= ?
        AND approval_state = 'C'
    `,
  ],
  param: getParam,
  hasAmount: true,
};

export const paymentCardVan: Config["source"] = {
  sql: [commonQuery + `AND approval_type = 'CARD_VAN'`],
  param: getParam,
  hasAmount: true,
};

export const paymentKeyin: Config["source"] = {
  sql: [commonQuery + `AND approval_type = 'KEYIN'`],
  param: getParam,
  hasAmount: true,
};

export const paymentBank: Config["source"] = {
  sql: [commonQuery + `AND approval_type = 'BANK'`],
  param: getParam,
  hasAmount: true,
};

export const paymentOfflineCard: Config["source"] = {
  sql: [commonQuery + `AND approval_type = 'OFFLINE_CARD'`],
  param: getParam,
  hasAmount: true,
};

export const paymentOfflineCash: Config["source"] = {
  sql: [commonQuery + `AND approval_type = 'OFFLINE_CASH'`],
  param: getParam,
  hasAmount: true,
};

export const paymentPointNormal: Config["source"] = {
  sql: [commonQuery + `AND merchant_code = 'POINT_NORMAL_PAYMENT'`],
  param: getParam,
  hasAmount: true,
};

export const paymentPointAuto: Config["source"] = {
  sql: [commonQuery + `AND merchant_code = 'POINT_AUTO_PAYMENT'`],
  param: getParam,
  hasAmount: true,
};
