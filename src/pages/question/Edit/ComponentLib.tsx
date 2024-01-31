import React, { FC } from "react";
import { Typography } from "antd";
import { componentConfGroup } from "../../../components/QuestionComponents";

const { Title } = Typography;

const Lib: FC = () => {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index === 0 ? "0" : "20px"
              }}
            >
              {groupName}
            </Title>
          </div>
        );
      })}
    </div>
  );
};

export default Lib;
