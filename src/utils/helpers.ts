import { DATE_ERROR_MSG } from './constans'

export const meterialUiDateErrorMsgHandler = (type: string | null): string => {
  if (type === null) return "";
  const typeList = Object.keys(DATE_ERROR_MSG.meterialParam);
  const txt =
    typeList.findIndex((e) => e === type) === -1
      ? DATE_ERROR_MSG.custom.default
      : DATE_ERROR_MSG.meterialParam[type];
  return txt;
};