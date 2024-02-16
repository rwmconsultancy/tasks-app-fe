import React, { useState } from "react";
import { Layout, Typography, FloatButton, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import Navbar from "../components/UI/Navbar";
import TopHeader from "../components/UI/TopHeader";
import TasksContainer from "../components/UI/TasksContainer";
import AntdModal from "../components/UI/AntdModal";

const { Title } = Typography;
const { Sider, Content } = Layout;
const { TextArea } = Input;

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const newTaskHandler = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/tasks",
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.message);
      message.success(response.data.message);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <TopHeader />
      <Layout>
        <Sider width={200} style={{}} theme="dark">
          <Navbar selectedKey={"tasks"} />
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
            <Title level={2}>Tasks</Title>
            {/* NEW modal below */}
            <AntdModal
              open={isModalOpen}
              width={1000}
              title={"New task"}
              onOk={() => newTaskHandler(taskTitle, taskDescription)}
              onCancel={() => setIsModalOpen(false)}
            >
              <Input
                placeholder="Title"
                id="title"
                onChange={handleTaskTitle}
              />
              <br />
              <br />
              <TextArea
                placeholder="Description of task"
                onChange={handleTaskDescription}
              />
            </AntdModal>

            <FloatButton
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsModalOpen(true)}
            />
            <TasksContainer />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Tasks;
