"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { Table, Upload, message, Button, Modal, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const VALID_CONFIRM_CODE = "jeejio2025";

async function batchInsertData(data, sourceType) {
  console.log("导入来源类型:", sourceType);
  console.log("导入批量数据到数据库:", data);

  // 这里区分另一个数据库存入区别一下
  const response = await fetch("/api/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sourceType,
      data,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log("上传结果:", result);
}

const CsvUploader = () => {
  const [parsedData, setParsedData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [uploadFlag, setUploadFlag] = useState(false);
  const [sourceType, setSourceType] = useState("default"); // 'default' or 'extended'

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCSV = (file, type = "default") => {
    setSourceType(type);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;
        console.log("解析后的 CSV 数据:", rows);

        const filteredArray = rows.map(({ email: email, orders: orders }) => ({
          email: email,
          orders: orders,
        }));


        setParsedData(filteredArray);
        console.log("过滤后的 CSV 数据:", filteredArray);
        setUploadFlag(true);

        if (filteredArray.length > 0) {
          const keys = Object.keys(filteredArray[0]);
          const tableColumns = keys.map((key) => ({
            title: key,
            dataIndex: key,
            key,
          }));
          setColumns(tableColumns);
        }

        message.success("CSV 文件解析成功！");
      },
      error: function (error) {
        console.error("CSV 解析错误:", error);
        message.error("CSV 文件解析失败！");
      },
    });
  };

  const handleButtonClick = () => {
    setIsModalVisible(true);
    setConfirmCode("");
    setErrorMessage("");
  };

  const handleConfirm = async () => {
    if (!confirmCode.trim()) {
      setErrorMessage("请输入确认码");
      return;
    }

    setLoading(true);
    try {

      if (confirmCode === VALID_CONFIRM_CODE) {
        await batchInsertData(parsedData, sourceType);
        Modal.success({
          title: "操作成功",
          content: "数据已成功上传到数据库",
        });
        setIsModalVisible(false);
      } else {
        setErrorMessage("确认码不正确，请重新输入");
      }
    } catch (error) {
      Modal.error({
        title: "操作失败",
        content: "上传过程中发生错误，请重试",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: "flex", gap: "1rem" }}>
        <Upload
          accept=".csv"
          beforeUpload={(file) => {
            handleCSV(file, "default");
            return false;
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>
            上传仅有快递单号订单的 CSV 文件
          </Button>
        </Upload>

        <Upload
          accept=".csv"
          beforeUpload={(file) => {
            handleCSV(file, "extended");
            return false;
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>
            上传全量邮箱 CSV 文件
          </Button>
        </Upload>
      </div>

      {uploadFlag && (
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleButtonClick} loading={loading}>
            上传到数据库
          </Button>

          <Modal
            title="确认操作"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                取消
              </Button>,
              <Button
                key="confirm"
                type="primary"
                onClick={handleConfirm}
                loading={loading}
              >
                确认
              </Button>,
            ]}
          >
            <p>请输入确认码以继续操作：</p>
            <Input.Password
              value={confirmCode}
              onChange={(e) => {
                setConfirmCode(e.target.value);
                setErrorMessage("");
              }}
              placeholder="输入确认码"
              style={{ marginTop: 10 }}
            />
            {errorMessage && (
              <div style={{ color: "red", marginTop: 8, fontSize: 14 }}>
                {errorMessage}
              </div>
            )}
          </Modal>
        </div>
      )}

      {parsedData.length > 0 && (
        <Table
          columns={columns}
          dataSource={parsedData.map((row, index) => ({ key: index, ...row }))}
          pagination={{ pageSize: 10 }}
          style={{ marginTop: 20 }}
          bordered
        />
      )}
    </div>
  );
};

export default CsvUploader;
