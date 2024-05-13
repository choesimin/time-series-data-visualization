import Config from "@/types/Config";
import { bill } from "@/services/source/bill";
import {
  payment,
  paymentBank,
  paymentCancel,
  paymentCardVan,
  paymentKeyin,
  paymentOfflineCard,
  paymentOfflineCash,
  paymentPointAuto,
  paymentPointNormal,
} from "@/services/source/payment";
import {
  merchantRegistration,
  userRegistration,
} from "@/services/source/merchant";
import { pointUse, pointUseCancel } from "./source/point";

export default function getConfig(id: string): Config {
  return config[id];
}

export function getIds(): string[] {
  return Object.keys(config);
}

const config: { [key: string]: Config } = {
  merchantRegistration: {
    name: "사업장 등록",
    source: merchantRegistration,
    target: {
      type: "merchantRegistration",
    },
  },
  userRegistration: {
    name: "회원 등록",
    source: userRegistration,
    target: {
      type: "userRegistration",
    },
  },

  bill: {
    name: "청구",
    source: bill,
    target: {
      type: "bill",
    },
  },

  payment: {
    name: "결제",
    source: payment,
    target: {
      type: "payment",
    },
  },
  paymentCancel: {
    name: "결제 취소",
    source: paymentCancel,
    target: {
      type: "paymentCancel",
    },
  },

  paymentCardVan: {
    name: "앱카드 결제",
    source: paymentCardVan,
    target: {
      type: "paymentCardVan",
    },
  },
  paymentKeyin: {
    name: "키인 결제",
    source: paymentKeyin,
    target: {
      type: "paymentKeyin",
    },
  },
  paymentBank: {
    name: "계좌이체 결제",
    source: paymentBank,
    target: {
      type: "paymentBank",
    },
  },
  paymentOfflineCard: {
    name: "현장 카드 결제",
    source: paymentOfflineCard,
    target: {
      type: "paymentOfflineCard",
    },
  },
  paymentOfflineCash: {
    name: "현장 현금 결제",
    source: paymentOfflineCash,
    target: {
      type: "paymentOfflineCash",
    },
  },

  paymentPointNormal: {
    name: "포인트 일반 결제",
    source: paymentPointNormal,
    target: {
      type: "paymentPointNormal",
    },
  },
  paymentPointAuto: {
    name: "포인트 자동 결제",
    source: paymentPointAuto,
    target: {
      type: "paymentPointAuto",
    },
  },

  pointUse: {
    name: "포인트 사용",
    source: pointUse,
    target: {
      type: "pointUse",
    },
  },
  pointUseCancel: {
    name: "포인트 사용 취소",
    source: pointUseCancel,
    target: {
      type: "pointUseCancel",
    },
  },
};
