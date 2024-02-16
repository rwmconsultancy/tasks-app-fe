import React from "react";
import { Layout, Typography } from "antd";
import Navbar from "../components/UI/Navbar";
import TopHeader from "../components/UI/TopHeader";

const { Title } = Typography;
const { Sider, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <TopHeader />
      <Layout>
        <Sider width={200} style={{}} theme="dark">
          <Navbar selectedKey={"dashboard"} />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Title level={2}>Dashboard</Title>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
