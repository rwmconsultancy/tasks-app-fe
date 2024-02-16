import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Space, Table, Tag, Typography, Switch, Button, Input } from "antd";

import AntdModal from "../UI/AntdModal";

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";


const { TextArea } = Input;
const { Link } = Typography;

const TasksContainer = (props) => {
  const [taskFinished, setTaskFinished] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [singleTaskData, setSingleTaskData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    getTaskData();
  }, [singleTaskData]);

  const handleCancel = () => {
    // console.log("Cancel clicked! ");
    closeEditModal();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const getTaskData = async () => {
    try {
      await axios
        .get("http://localhost:5001/api/tasks", {
          withCredentials: true,
        })
        .then((res) => {
          let data = res.data;
          setTableData(data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getSingleTask = async (record) => {
    try {
      await axios
        .get(`http://localhost:5001/api/tasks/${record}`, {
          withCredentials: true,
        })
        .then((res) => {
          setSingleTaskData(res.data);
        });
    } catch (e) {
      console.log(e);
    }
    setIsEditModalOpen(true);
  };

  const updateSingleTask = async (record) => {
    try {
      await axios
        .put(
          `http://localhost:5001/api/tasks/${record}`,
          {
            title: record.title,
            description: record.description,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setSingleTaskData(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const saveHandler = async () => {
    await updateSingleTask({
      title: singleTaskData.title,
      description: singleTaskData.description,
      tags: singleTaskData.tags,
      finished: singleTaskData.finished,
    });
    setIsEditModalOpen(false);
  };

  const deleteHandler = (id) => {
    console.log(`Deleted ${id}`);
  };
  const editHandler = (id) => {
    console.log(`Edit ${id}`);
  };

  const finishedHandler = (id, checked) => {
    console.log(`Finished: ${checked} -  ${id}`);
    setTaskFinished(checked);
  };

  const columns = [
    {
      title: "Title",
      width: "40%",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <Link onClick={() => getSingleTask(record._id)}>{title}</Link>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "Boom Transport") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Switch
            id={record.id}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            size="small"
            onChange={(checked) => finishedHandler(record._id, checked)}
          />
          <Button
            shape="circle"
            danger="true"
            // type="dashed"
            // loading
            size="small"
            onClick={() => deleteHandler(record._id)}
            icon={<DeleteOutlined />}
          ></Button>
          <Button
            shape="circle"
            type="Warning"
            size="small"
            onClick={() => editHandler(record._id)}
            icon={<EditOutlined />}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: false,
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => record._id}
      />
      {/* EDIT modal below */}
      <AntdModal
        open={isEditModalOpen}
        width={"50%"}
        title={`Edit task - ${singleTaskData.title}`}
        onOk={saveHandler}
        okText={"Save task"}
        // onCancel={() => setIsEditModalOpen(false)}
        onCancel={handleCancel}
      >
        Task created at: <b>{dayjs(singleTaskData.createdAt, "DD-MM-YYYY").toString()}</b>
        
        <br />
        Task updated at: <b>{dayjs(singleTaskData.updatedAt, "DD-MM-YYYY").toString()}</b>
        <br />
        <br />
        <Input
          placeholder="Title"
          // defaultValue={singleTaskData.title} d
          value={singleTaskData.title}
          id="title"
          onChange={(e) =>
            setSingleTaskData({ ...singleTaskData, title: e.target.value })
          }
        />
        <br />
        <br />
        <TextArea
          placeholder="Description of task"
          id="description"
          value={singleTaskData.description}
          onChange={(e) =>
            setSingleTaskData({
              ...singleTaskData,
              description: e.target.value,
            })
          }
          style={{ height: 100 }}
        />
        <br />
        <br />
        <b>Tags: </b>
        <br />
        {singleTaskData.tags?.map((tag) => (
          <Tag closable key={tag}>
            {tag}
          </Tag>
        ))}
      </AntdModal>
    </>
  );
};

export default TasksContainer;
