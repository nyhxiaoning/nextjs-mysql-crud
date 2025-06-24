// 生成一个Nextjs的组件，这个组件布局居中有一个输入框
// app/components/CsvUploader.tsx
'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Table, Upload, message, Button,Modal,Input } from 'antd';
import axios from "axios";


import { UploadOutlined } from '@ant-design/icons';
// email表单数据汇总查询
const VALID_CONFIRM_CODE = 'jeejio2025';


async function batchInsertData(data) {
  // 这里可以实现批量插入数据到数据库的逻辑
  console.log('导入批量数据到数据库data', data);
  let results = await axios.post("/api/emails", data);
  console.log(results);
  console.log('object---batchInsertData', data);
}



const CsvUploader= () => {
  const [parsedData, setParsedData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [uploadFlag, setUploadFlag] = useState(false);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 打开确认码模态框
  const handleButtonClick = () => {
    setIsModalVisible(true);
    setConfirmCode('');
    setErrorMessage('');
  };

  const handleCSV = (file) => {
    Papa.parse(file, {
      header: true, // 首行为字段名
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;
        console.log('解析后的 CSV 数据:', rows);
        // 优化实战一下，一次性给数据库表插入所有的数据到table表中
        // 插入数据到数据库中

        setParsedData(rows);
        setUploadFlag(true);
        // 自动生成列头
        if (rows.length > 0) {
          const keys = Object.keys(rows[0]);
          const tableColumns = keys.map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
          }));
          setColumns(tableColumns);
        }

        message.success('CSV 文件解析成功！');
      },
      error: function (error) {
        console.error('CSV 解析错误:', error);
        message.error('CSV 文件解析失败！');
      },
    });
  };

  // 验证确认码
  const handleConfirm = async () => {
    if (!confirmCode.trim()) {
      setErrorMessage('请输入确认码');
      return;
    }

    // 模拟验证过程（实际项目中应发送到后端验证）
    setLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));

      if (confirmCode === VALID_CONFIRM_CODE) {
        // 确认码正确，执行上传逻辑
        // await uploadToDatabase();
        await batchInsertData(parsedData);
        Modal.success({
          title: '操作成功',
          content: '数据已成功上传到数据库',
        });
        setIsModalVisible(false);
      } else {
        setErrorMessage('确认码不正确，请重新输入');
      }
    } catch (error) {
      Modal.error({
        title: '操作失败',
        content: '上传过程中发生错误，请重试',
      });
    } finally {
      setLoading(false);
    }
  };

  // 模拟上传到数据库的函数（实际项目中应替换为真实API调用）
  const uploadToDatabase = async () => {
    // 这里是上传逻辑，如调用API
    console.log(parsedData,'parsedData');
    console.log('Uploading data to database...');
    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };



  const props = {
    accept: '.csv',
    beforeUpload: (file) => {
      handleCSV(file);
      return false; // 阻止自动上传
    },
    showUploadList: false,
  };

  return (
    <div style={{ padding: 24 }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
      </Upload>

      {uploadFlag &&
        <div style={{ marginTop: 20 }}>
          <Button
            type="primary"
            onClick={handleButtonClick}
            loading={loading}
          >
            上传到数据库
          </Button>

          <Modal
            title="确认操作"
            visible={isModalVisible}
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
                setErrorMessage('');
              }}
              placeholder="输入确认码"
              style={{ marginTop: 10 }}
            />
            {errorMessage && (
              <div style={{ color: 'red', marginTop: 8, fontSize: 14 }}>
                {errorMessage}
              </div>
            )}
          </Modal>
        </div>
      }

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
