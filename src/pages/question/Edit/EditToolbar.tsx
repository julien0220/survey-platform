import React, { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteSelectedComponent } from "../../../store/componentsReducer";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
