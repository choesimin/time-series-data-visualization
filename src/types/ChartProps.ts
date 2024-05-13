import { DataKey } from "@/types/Datum";

export default interface ChartProps {
  title: string;
  dataIds: string[] | string[][];
  dataKey: DataKey;
  yAxisFormatter?: (value: number) => string;
}
