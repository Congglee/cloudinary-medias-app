import { useMemo, useState } from "react";

export const usePagination = <T extends any>(
  data: T[],
  volume: number = 10
) => {
  /** All pages in total. */
  const totalPages = useMemo(
    () => Math.ceil(data.length / volume),
    [volume, data.length]
  );

  const [page, setPage] = useState(0);

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const slicedData = useMemo(
    () => data.slice(0, (page + 1) * volume), // tách một phần của mảng bắt đầu từ index 0 đến (page + 1) * volume (không lấy đoạn dữ liệu này)
    [data, page, volume]
  );

  //  /** Data representing one single page. */
  // const slicedData = useMemo(
  //   () => data.slice(page * volume, page * volume + volume),
  //   [volume, page]
  // );

  return { data: slicedData, page, totalPages, setPage, nextPage };
};
