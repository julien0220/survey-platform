import React, { FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
import { Input } from "antd";

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState<string>("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]);

  function handleSearch(value: string) {
    // 跳转页面，增加url参数
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    });
  }

  return (
    <Search
      allowClear={true}
      size="middle"
      placeholder="输入关键字"
      onSearch={handleSearch}
      style={{ width: "260px" }}
      onChange={handleChange}
      value={value}
    />
  );
};

export default ListSearch;
