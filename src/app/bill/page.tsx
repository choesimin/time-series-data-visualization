"use client";

import React from "react";
import LineChart from "@/components/LineChart";

const Bill: React.FC = () => {
  return (
    <>
      <LineChart
        title="청구 & 결제"
        dataIds={["bill", "payment"]}
        dataKey="amount"
        yAxisFormatter={(value) => `${Math.round(value / 100000000)}억`}
      />
    </>
  );
};

export default Bill;
