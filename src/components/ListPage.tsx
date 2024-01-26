import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LISt_PAGE_SIZE
} from "../constant";

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LISt_PAGE_SIZE);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LISt_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  return <Pagination current={current} pageSize={pageSize} total={total} />;
};

export default ListPage;
