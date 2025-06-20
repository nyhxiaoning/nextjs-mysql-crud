"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Card,
  message,
  // Link
} from "antd";
import axios from "axios";

import allData from "../consts/allData";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const { Title, Text } = Typography;
async function SearchEmails(email) {
  try {
    const { data } = await axios.get(
      `${allData.baseURL}/api/emails/search?email=${encodeURIComponent(email)}`
    );
    console.log(data, "当前的 email");
    return data;
  } catch (error) {
    return "查询失败，请稍后再试";
  }
}

const SearchCard = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [objdata, setObjdata] = useState(null);
  const [state, setState] = useState({
    value: "",
    copied: false,
  });
  const handleSearch = async () => {
    if (!inputValue.trim()) {
      message.error("请输入内容后查询");

      return;
    } else {
      try {
        let tempResult = await SearchEmails(inputValue);
        console.log(tempResult, "tempResult");
        setObjdata(tempResult);
        if (!tempResult ) {
          // setResult("没有查询到相关内容");
          setResult(tempResult);
        } else {
          setResult(tempResult);
        }
      } catch (error) {
        // setResult("没有查询到相关内容");
        return;
      }

      // setResult(`你输入的查询内容是：「${inputValue}」`);
    }
  };

  return (
    <div style={{ margin: "80px auto", textAlign: "center" }}>
      <Title
        level={3}
        style={{
          marginBottom: 24,
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        查询界面
      </Title>

      <div
        style={{
          display: "inline-flex",
          width: "45%",
          maxWidth: 600,
          marginBottom: 16,
          border: "1px solid #d9d9d9",
          padding: "40px 30px",
          borderRadius: 4,
        }}
      >
        <Input
          placeholder="请输入查询内容"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSearch}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </div>

      <br />

      {result && (
        <div
          style={{
            display: "inline-flex",
            width: "45%",
            maxWidth: 600,
            marginBottom: 16,
            border: "1px solid #d9d9d9",
            padding: "40px 30px",
            borderRadius: 4,
          }}
        >
          <Card title="查询结果" style={{ margin: "0 auto",border:'0px' }}>
            {/* <Text>{result}</Text> */}

            {objdata && objdata?.orders && (
              <>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    textAlign: "left",
                  }}
                >
                  ✅ Your PixelMug has shipped!
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    textAlign: "left",
                  }}
                >
                  Tracking number: {result?.orders}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    textAlign: "left",
                  }}
                >
                  <a
                    target="_blank"
                    href={`https://t.17track.net/en#nums=${result?.orders}`}
                  >
                    Track here: https://t.17track.net/
                  </a>
                </p>

                {/* <CopyToClipboard
                  text={result}
                  style={{ marginLeft: 10, marginTop: 10 }}
                  onCopy={() => setState({ copied: true })}
                >
                  <button>Copy to clipboard</button>
                </CopyToClipboard> */}
              </>
            )}

            {!objdata?.orders && (
              <div
                style={{
                  maxWidth: "500px",
                  margin: "0 auto",
                  padding: "20px",
                  border: "1px solid #eaeaea",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "#f56c6c",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  >
                    ❌
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      textAlign: "left",
                    }}
                  >
                    We couldn't find a tracking number associated with your
                    email yet.
                  </p>
                </div>

                <p
                  style={{
                    margin: "12px 0",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    textAlign: "left",
                  }}
                >
                  Please make sure you're using the same email address you used
                  when placing your order on Kickstarter.
                </p>

                <p
                  style={{
                    margin: "12px 0",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    textAlign: "left",
                  }}
                >
                  If that is correct, we kindly ask for your patience as we
                  update the shipping information — or double-check that your
                  shipping address has been submitted.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
