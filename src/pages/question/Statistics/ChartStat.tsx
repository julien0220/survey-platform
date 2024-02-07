import React, { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { getComponentStatService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { id } = useParams();
  const [stat, setStat] = useState({});
  const { selectedComponentId, selectedComponentType } = props;
  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess: (res) => {
        setStat(res.stat);
      }
    }
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>;
    else return <div>{JSON.stringify(stat)}</div>;
  }

  return (
    <>
      <Title level={3}>图表统计 </Title>
      <div>{genStatElem()}</div>
    </>
  );
};

export default ChartStat;
