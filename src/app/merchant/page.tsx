"use client";

import React from "react";
import LineChart from "@/components/LineChart";

const Merchant: React.FC = () => {
  return (
    <LineChart
      title="회원 & 사업장 등록"
      dataIds={["userRegistration", "merchantRegistration"]}
      dataKey="count"
      yAxisFormatter={(value) => `${Math.round(value)}`}
    />
  );
};

export default Merchant;
