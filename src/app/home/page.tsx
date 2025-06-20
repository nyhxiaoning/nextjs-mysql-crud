// 生成一个Nextjs的组件，这个组件布局居中有一个输入框
// app/components/CsvUploader.tsx
'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Table, Upload, message, Button } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// email表单数据汇总查询


interface ParsedRow {
  [key: string]: string;
}

const CsvUploader: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const handleCSV = (file: File) => {
    Papa.parse<ParsedRow>(file, {
      header: true, // 首行为字段名
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data;
        console.log('解析后的 CSV 数据:', rows);
        // 优化实战一下，一次性给数据库表插入所有的数据到table表中
        // 插入数据到数据库中

        setParsedData(rows);

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

  const props: UploadProps = {
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
