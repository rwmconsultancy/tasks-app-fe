import React from "react";
import { Modal } from "antd";

const AntdModal = ({ children, open, onOk, onCancel, title, width, okText }) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      okText={okText}
      style={{
        top: 20,
      }}
    >
      <p>{children}</p>
    </Modal>
  );
};

export default AntdModal;
