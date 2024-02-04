import React, { FC, useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { PageSetting } from "./PageSetting";
import ComponentProp from "./ComponentProp";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting"
}

const RightPanel: FC = () => {
  const [activeTab, setActiveTab] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    setActiveTab(selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />
    }
  ];
  return <Tabs activeKey={activeTab} items={tabsItems} />;
};

export default RightPanel;
