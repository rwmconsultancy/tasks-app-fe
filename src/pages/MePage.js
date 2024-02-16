import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Typography, message } from "antd";
import Navbar from "../components/UI/Navbar";
import TopHeader from "../components/UI/TopHeader";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

const MePage = () => {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(false)

  const fetch = async () => {
    try {
      await axios
        .get("http://localhost:5001/api/users/me", {
          withCredentials: true,
        })
        .then((response) => setInfo(response.data));
    } catch (e) {
      console.log(e);
      setError(true);
      message.error('Not Authorized! ')
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
        <TopHeader />
      <Layout>
        <Sider width={200} style={{}} theme="dark">
          <Navbar selectedKey={"me"} />
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
            <Title level={2}>Profile</Title>
            {!error &&
            <ul>
              <li><Text>Name: <b>{info.name}</b></Text></li>
              <li><Text>Email: <b>{info.email}</b></Text></li>
              <li><Text>_id: <b>{info._id}</b></Text></li>
              <li><Text>createdAt: <b>{info.createdAt}</b></Text></li>
              <li><Text>updatedAt: <b>{info.updatedAt}</b></Text></li>
            </ul>}
            <br />
            <Title level={3}>Tags</Title>
            <br />
            sdfs
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MePage;
