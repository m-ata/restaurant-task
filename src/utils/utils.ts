import { itemsPerPage } from "./constants";

export const getPageCount = (total: number, pageSize = itemsPerPage) => {
  const pageCount = Math.ceil(total / pageSize);
  return pageCount;
};
