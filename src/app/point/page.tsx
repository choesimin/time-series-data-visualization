"use client";

import React from "react";
import LineChart from "@/components/LineChart";

const Payment: React.FC = () => {
  return (
    <>
      <LineChart
        title="포인트 일반 결제 & 자동 결제"
        dataIds={["paymentPointNormal", "paymentPointAuto"]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 10000)}만`}
      />
      <LineChart
        title="포인트 사용 & 사용 취소"
        dataIds={["pointUse", "pointUseCancel"]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 10000)}만`}
      />
    </>
  );
};

export default Payment;
