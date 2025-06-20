// app/components/SearchBox.tsx
'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Divider } from 'antd';
import allData from '../consts/allData';

const { Text } = Typography;

// api
async function SearchEmails(email) {
    const { data } = await axios.get(
        `${allData.baseURL}/api/emails/search?email=${encodeURIComponent(email)}`
      );
      console.log(data,'当前的 email');
      return data;
}


const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!inputValue) {
      setResult('请输入内容后查询');
      return;
    }

    SearchEmails(inputValue)
    // 模拟查询逻辑
    setResult(`你输入的查询内容是：${inputValue}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '100px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <Row gutter={12} align="middle">
        <Col flex="auto">
          <Input
            placeholder="请输入查询内容"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Col>
      </Row>

      <Divider />

      {result && (
        <Text type="secondary" style={{ fontSize: 16 }}>
          查询结果：{result}
        </Text>
      )}
    </div>
  );
};

export default SearchBox;
