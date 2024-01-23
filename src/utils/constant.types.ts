import dayjs from "dayjs";

export interface DateErrorMsgType {
  meterialParam: Record<string, string>;
  custom: {
    default: string;
    period: string;
  };
}

export  interface SearchFormInput {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}
