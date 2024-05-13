"use client";

import React from "react";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";

const Payment: React.FC = () => {
  return (
    <>
      <LineChart
        title="결제 & 취소"
        dataIds={["payment", "paymentCancel"]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 100000000)}억`}
      />
      <BarChart
        title="결제 수단 별"
        dataIds={[
          ["paymentCardVan", "paymentKeyin"],
          ["paymentBank"],
          ["paymentOfflineCard", "paymentOfflineCash"],
        ]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 100000000)}억`}
      />
    </>
  );
};

export default Payment;
