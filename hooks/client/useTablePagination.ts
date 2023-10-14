import { useMemo, useState } from "react";

const useTablePagination = (pageSize = 10) => {
  const [filter, setFilter] = useState<PaginationType>({
    limit: pageSize,
    offset: 0,
  });

  const pagination = useMemo(() => {
    return {
      current: filter.offset / pageSize + 1,
      pageSize: pageSize,
      onChange(page: number, pageSize: number) {
        setFilter({
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });
      },
    };
  }, [filter, pageSize]);

  return { pagination, filter };
};

export default useTablePagination;
