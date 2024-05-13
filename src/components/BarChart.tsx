"use client";

import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { BarChart as MuiBarChart } from "@mui/x-charts";
import getConfig from "@/services/config";
import { SumMode } from "@/constants/SumMode";
import ChartDatePicker from "@/components/ChartDatePicker";
import {
  findLongestArray,
  getFetchParams,
  formatDate,
  fetchDataAndSum,
} from "@/utils/chart";
import SumDatum from "@/types/SumDatum";
import { Typography } from "@mui/material";
import ChartProps from "@/types/ChartProps";

export interface BarChartProps extends ChartProps {
  dataIds: string[][];
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  dataIds,
  dataKey,
  yAxisFormatter,
}) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [mode, setMode] = useState<SumMode>(SumMode.DAY);

  const [sumDataset, setSumDataset] = useState<SumDatum[][][]>([]);

  useEffect(() => {
    if (date) fetchAndSetSumDataset(date);
  }, [date, mode]);

  async function fetchAndSetSumDataset(date: Dayjs) {
    const [startDate, endDate] = getFetchParams(date, mode);

    let newSumDataset: SumDatum[][][] = [];
    for (let j = 0; j < dataIds.length; j++) {
      newSumDataset[j] = newSumDataset[j] || [];
      for (let i = 0; i < dataIds[j].length; i++) {
        const newSumData: SumDatum[] = await fetchDataAndSum(
          dataIds[j][i],
          dataKey,
          mode,
          startDate,
          endDate
        );
        newSumDataset[j][i] = newSumData;
      }
    }

    setSumDataset(newSumDataset);
  }

  const highlightScope = {
    highlighted: "series",
    faded: "global",
  } as const;

  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h2" align="center" marginTop={10}>
        {title}
      </Typography>
      <ChartDatePicker
        date={date}
        mode={mode}
        onDateChange={setDate}
        onModeChange={setMode}
      />
      <Paper
        sx={{
          width: "100%",
          padding: "1rem",
        }}
      >
        <MuiBarChart
          xAxis={[
            {
              scaleType: "band",
              data: findLongestArray(sumDataset).map((sumDatum) =>
                dayjs(sumDatum.date)
              ),
              valueFormatter: (date) => formatDate(dayjs(date), mode),
            },
          ]}
          yAxis={[
            {
              valueFormatter: yAxisFormatter ? yAxisFormatter : undefined,
            },
          ]}
          series={sumDataset
            .flatMap((innerSumDataset, stack) => {
              return innerSumDataset.map((sumData, index) => {
                return {
                  label: getConfig(dataIds[stack][index]).name,
                  stack: stack.toString(),
                  data: sumData.map((sumDatum) => sumDatum.value),
                };
              });
            })
            .map((s) => ({ ...s, highlightScope }))}
          height={800}
        ></MuiBarChart>
      </Paper>
    </Container>
  );
};

export default BarChart;
