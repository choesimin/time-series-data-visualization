"use client";

import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { LineChart as MuiLineChart } from "@mui/x-charts";
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
import { LinearProgress, Typography } from "@mui/material";
import ChartProps from "@/types/ChartProps";

export interface LineChartProps extends ChartProps {
  dataIds: string[];
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  dataIds,
  dataKey,
  yAxisFormatter,
}) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [mode, setMode] = useState<SumMode>(SumMode.DAY);
  const [loading, setLoading] = useState<boolean>(false);
  const [sumDataset, setSumDataset] = useState<SumDatum[][]>([]);

  useEffect(() => {
    if (date) fetchAndSetSumDataset(date);
  }, [date, mode]);

  async function fetchAndSetSumDataset(date: Dayjs) {
    setLoading(true);

    const [startDate, endDate] = getFetchParams(date, mode);

    let newSumDataset: SumDatum[][] = [];
    for (let i = 0; i < dataIds.length; i++) {
      const newSumData: SumDatum[] = await fetchDataAndSum(
        dataIds[i],
        dataKey,
        mode,
        startDate,
        endDate
      );
      newSumDataset[i] = newSumData;
    }

    setSumDataset(newSumDataset);

    setLoading(false);
  }

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
          position: "relative",
        }}
      >
        {loading && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          />
        )}
        <MuiLineChart
          xAxis={[
            {
              scaleType: "time",
              data: findLongestArray<SumDatum>(sumDataset).map((sumDatum) =>
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
          series={sumDataset.map((sumData, index) => {
            return {
              label: getConfig(dataIds[index]).name,
              data: sumData.map((sumDatum) => sumDatum.value),
            };
          })}
          height={800}
        ></MuiLineChart>
      </Paper>
    </Container>
  );
};

export default LineChart;
