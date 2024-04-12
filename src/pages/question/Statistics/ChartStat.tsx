import React, { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getComponentStatService } from "../../../services/stat";
import { getComponentConfByType } from "../../../components/QuestionComponents";

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
        setStat(res.stat.list);
      }
    }
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>;

    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};
    return StatComponent !== null && StatComponent !== undefined ? (
      <div>
        <StatComponent stat={stat as { name: string; count: number }[]} />
      </div>
    ) : (
      <div>该组件无统计图表</div>
    );
  }

  return (
    <>
      <Title level={3}>图表统计 </Title>
      <div>{genStatElem()}</div>
    </>
  );
};

export default ChartStat;
