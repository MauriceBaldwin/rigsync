import dayjs from "dayjs";
import { DateRequest, DateResponse } from "./generated/models";

export const dateResponseToDayJs = (
  date?: DateResponse,
): dayjs.Dayjs | null | undefined => {
  if (!date) return undefined;

  return dayjs(new Date(
    date.year,
    date.month - 1, // month is 0-indexed in js but 1-12 in API
    date.day,
  ));
};

export const dayJsToDateRequest = (
  date?: dayjs.Dayjs | null,
): DateRequest | undefined => {
  if (!date) return undefined;

  return {
    year: date.year(),
    month: date.month() + 1, // month is 1-12 in API but 0 indexed in dayjs
    day: date.date(),
  };
};
