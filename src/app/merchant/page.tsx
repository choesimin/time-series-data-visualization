"use client";

import BarChart from "@/components/BarChart";
import React from "react";

const Merchant: React.FC = () => {
  return (
    <BarChart
      title="회원 & 사업장 등록"
      dataIds={[["userRegistration"], ["merchantRegistration"]]}
      dataKey="count"
      yAxisFormatter={(value) => `${Math.round(value)}`}
    />
  );
};

export default Merchant;
