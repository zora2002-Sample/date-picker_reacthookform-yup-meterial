import dayjs from "dayjs";

import type { DateErrorMsgType, SearchFormInput } from './constant.types'

export const DATE_ERROR_MSG: DateErrorMsgType = {
  meterialParam: {
    disableFuture: "日期最晚不能超過今天",
    shouldDisableYear: "日期不能早於2023年",
    invalidDate: "無效日期"
  },
  custom: {
    default: "日期格式錯誤",
    period: "「開始日期」不能比「結束日期」晚"
  }
};

export const SEARCH_DEFAULT_VALUE: SearchFormInput = {
  startDate: dayjs().subtract(3, "month"),
  endDate: dayjs()
};
