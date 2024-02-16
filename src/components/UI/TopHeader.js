import React from "react";
import logo from "../../images/rwm.png";
import { Layout } from "antd";

const { Header } = Layout;

const TopHeader = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        height: 100,
      }}
    >
      <img alt="logo" src={logo} width={300} />
    </Header>
  );
};

export default TopHeader;
