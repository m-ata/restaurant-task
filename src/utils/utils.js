import { itemsPerPage } from "./constants";

export const getHoursInTimestamp = timestamp =>
  Math.round((Date.now() - new Date(timestamp).getTime()) / 1000 / 60 / 60);

export const getPageCount = (total, pageSize = itemsPerPage) => {
  const pageCount = Math.ceil(total / pageSize);
  return pageCount;
};
