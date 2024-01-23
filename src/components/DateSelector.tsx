import { useForm, SubmitHandler, Controller, Resolver } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

import { Paper, Button, Grid } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DATE_ERROR_MSG, SEARCH_DEFAULT_VALUE } from '../utils/constans'
import type { SearchFormInput } from '../utils/constant.types'
import { meterialUiDateErrorMsgHandler } from '../utils/helpers'

const validate = yup.object({
  startDate: yup
    .date()
    .typeError(DATE_ERROR_MSG.meterialParam.invalidDate)
    .max(
      SEARCH_DEFAULT_VALUE.endDate?.toDate(),
      DATE_ERROR_MSG.meterialParam.disableFuture
    )
    .min(
      dayjs("2023-01-01").toDate(),
      DATE_ERROR_MSG.meterialParam.shouldDisableYear
    ),
  endDate: yup
    .date()
    .typeError(DATE_ERROR_MSG.meterialParam.invalidDate)
    .max(
      SEARCH_DEFAULT_VALUE.endDate?.toDate(),
      DATE_ERROR_MSG.meterialParam.disableFuture
    )
    .min(
      dayjs("2023-01-01").toDate(),
      DATE_ERROR_MSG.meterialParam.shouldDisableYear
    )
});

const DateSelector = () => {
  const [startDateErrorMsg, setStartDateErrorMsg] = useState("");
  const [endDateErrorMsg, setEndDateErrorMsg] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    // NOTE codesandbox 上 type 正常，本地端卻異常，先暫時用 disable 和 unknown 處理
    // resolver: yupResolver(validate),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validate) as unknown as Resolver<SearchFormInput, any>,
    defaultValues: SEARCH_DEFAULT_VALUE
  });

  const searchSubmit: SubmitHandler<SearchFormInput> = async (submitData) => {
    if (submitData.startDate.valueOf() > submitData.endDate.valueOf()) {
      alert(DATE_ERROR_MSG.custom.period);
      return;
    }
    console.log(submitData);
  };
  // console.log(errors);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmit(searchSubmit)}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4} md={4}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={SEARCH_DEFAULT_VALUE.startDate}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="開始日期"
                    sx={{ width: "100%" }}
                    disableFuture
                    shouldDisableYear={(date) => date?.year() < 2023}
                    format={"YYYY-MM-DD"}
                    defaultValue={SEARCH_DEFAULT_VALUE.startDate}
                    onError={(error) => {
                      setStartDateErrorMsg(
                        meterialUiDateErrorMsgHandler(error ? error : null)
                      );
                    }}
                    slotProps={{
                      textField: {
                        helperText: errors?.startDate
                          ? (errors?.startDate?.message as string)
                          : startDateErrorMsg
                          ? startDateErrorMsg
                          : ""
                      }
                    }}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <Controller
              name="endDate"
              control={control}
              defaultValue={SEARCH_DEFAULT_VALUE.endDate}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="結束日期"
                    sx={{ width: "100%" }}
                    disableFuture
                    shouldDisableYear={(date) => date?.year() < 2023}
                    format={"YYYY-MM-DD"}
                    defaultValue={SEARCH_DEFAULT_VALUE.endDate}
                    onError={(error) => {
                      console.log(error);
                      setEndDateErrorMsg(
                        meterialUiDateErrorMsgHandler(error ? error : null)
                      );
                    }}
                    slotProps={{
                      textField: {
                        helperText: errors?.endDate
                          ? (errors?.endDate?.message as string)
                          : endDateErrorMsg
                          ? endDateErrorMsg
                          : ""
                      }
                    }}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right"
            }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              fullWidth
            >
              篩選
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DateSelector;
