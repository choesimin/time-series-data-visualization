import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { SumMode } from "@/constants/SumMode";
import { INITIAL_DATE } from "@/constants/date";

interface ChartDatePickerProps {
  date: Dayjs | null;
  mode: SumMode;
  onDateChange: (newDate: Dayjs | null) => void;
  onModeChange: (newMode: SumMode) => void;
}

const ChartDatePicker: React.FC<ChartDatePickerProps> = ({
  date,
  mode,
  onDateChange,
  onModeChange,
}) => {
  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: SumMode | null
  ) => {
    if (newMode !== null && newMode !== mode) {
      onModeChange(newMode);
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate !== null && !dayjs(newDate).isSame(date, "day")) {
      onDateChange(newDate);
    }
  };

  return (
    <Box display="flex" gap={2}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="graph mode"
      >
        <ToggleButton value={SumMode.YEAR} aria-label="year mode">
          <WbTwilightIcon />
        </ToggleButton>
        <ToggleButton value={SumMode.MONTH} aria-label="month mode">
          <NightsStayIcon />
        </ToggleButton>
        <ToggleButton value={SumMode.DAY} aria-label="day mode">
          <CalendarMonthIcon />
        </ToggleButton>
        <ToggleButton value={SumMode.HOUR} aria-label="hour mode">
          <AccessTimeIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {mode === SumMode.YEAR && <DatePicker label="연 기준" disabled />}
        {mode === SumMode.MONTH && (
          <DatePicker
            label="월 기준"
            format="YYYY년"
            views={["year"]}
            value={date}
            onChange={handleDateChange}
            minDate={dayjs(INITIAL_DATE)}
            maxDate={dayjs()}
          />
        )}
        {mode === SumMode.DAY && (
          <DatePicker
            label="일 기준"
            format="YYYY년 MM월"
            views={["year", "month"]}
            value={date}
            onChange={handleDateChange}
            minDate={dayjs(INITIAL_DATE)}
            maxDate={dayjs()}
          />
        )}
        {mode === SumMode.HOUR && (
          <DatePicker
            label="시간 기준"
            format="YYYY년 MM월 DD일"
            views={["year", "month", "day"]}
            value={date}
            onChange={handleDateChange}
            minDate={dayjs(INITIAL_DATE)}
            maxDate={dayjs()}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default ChartDatePicker;
