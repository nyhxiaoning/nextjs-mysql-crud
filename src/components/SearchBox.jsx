'use client';

import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Divider, Card } from 'antd';
import axios from 'axios';

import allData from '../consts/allData';
const { Title, Text } = Typography;
async function SearchEmails(email) {
    const { data } = await axios.get(
        `${allData.baseURL}/api/emails/search?email=${encodeURIComponent(email)}`
      );
      console.log(data,'当前的 email');
      return data;
}

const SearchCard= () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setResult('请输入内容后查询');
    } else {
        let tempResult = SearchEmails(inputValue)
       setResult(tempResult)
      setResult(`你输入的查询内容是：「${inputValue}」`);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '80px auto', padding: 24 }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        查询界面
      </Title>

      <Row gutter={12} align="middle" justify="center">
        <Col flex="auto">
          <Input
            placeholder="请输入查询内容"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSearch}
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
        <Card title="查询结果" bordered style={{ marginTop: 24 }}>
          <Text>{result}</Text>
        </Card>
      )}
    </div>
  );
};

export default SearchCard;
