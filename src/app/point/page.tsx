"use client";

import React from "react";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";

const Payment: React.FC = () => {
  return (
    <>
      <LineChart
        title="포인트 사용 & 사용 취소"
        dataIds={["pointUse", "pointUseCancel"]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 10000)}만`}
      />
      <BarChart
        title="포인트 결제 & 사용"
        dataIds={[["paymentPointNormal", "paymentPointAuto"], ["pointUse"]]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 10000)}만`}
      />
    </>
  );
};

export default Payment;
