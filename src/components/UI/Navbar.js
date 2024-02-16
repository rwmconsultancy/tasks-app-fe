import React from "react";
import "./Navbar.css";
import {
  DashboardOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    { type: "divider" },
    {
      label: "Tasks",
      key: "tasks",
      icon: <CheckCircleOutlined />,
    },
    { type: "divider" },
    {
      label: `Profile`,
      key: "me",
      icon: <UserOutlined />,
    },
  ];

  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e);
    navigate(`/${e.key}`);
  };
  return (
    <Menu
      theme="dark"
      className="sider"
      onClick={onClick}
      defaultSelectedKeys={["dashboard"]}
      selectedKeys={[`${props.selectedKey}`]}
      // mode="inline"
      items={items}
    />
  );
};
export default Navbar;
