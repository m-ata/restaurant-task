import { itemsPerPage } from "./constants";

export const getHoursInTimestamp = (timestamp: number | string | Date) =>
  Math.round((Date.now() - new Date(timestamp).getTime()) / 1000 / 60 / 60);

export const getPageCount = (total: number, pageSize = itemsPerPage) => {
  const pageCount = Math.ceil(total / pageSize);
  return pageCount;
};
