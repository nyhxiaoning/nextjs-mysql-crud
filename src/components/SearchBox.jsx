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

import allData from "../consts/allData";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const { Title, Text } = Typography;
async function SearchEmails(email) {
  try {
    const res = await fetch(
      `${allData.baseURL}/api/emails/search?email=${encodeURIComponent(email)}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

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
  const [hasEmail, setHasEmail] = useState(false);
  const [state, setState] = useState({
    value: "",
    copied: false,
  });

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSearch = async () => {
    console.log(inputValue, "inputValue");
    if (!inputValue.trim()) {
      message.error("Please enter the content and query");

      return;
    } else {
      if (!validateEmail(inputValue.trim())) {
        message.error("Please enter a valid email address");
        return;
      }
      try {
        // 优化一下，将inputValue的前后空格去掉
        console.log(inputValue.trim(), "inputValue.trim()");
        let tempResult = await SearchEmails(inputValue.trim());
        console.log(tempResult, "tempResult");
        // if(tempResult.orders === -1){
        //   console.log('没有查询到邮箱');
        //   setHasEmail(false);
        //   console.log(hasEmail, "hasEmail");
        // }else {
        //   setHasEmail(true);
        // }
        setObjdata(tempResult);
        setResult(tempResult);
        if (objdata?.orders === -1) {
          // 没有订单信息
          setHasEmail(false);
        } else {
          setHasEmail(true);

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
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        PixelMug Shipment Lookup
      </Title>
      <p style={{ color: "#aaaaaa" }}>
        Enter the email you used when making purchase to check shipping status:
      </p>

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
          placeholder="Please enter your email address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSearch}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Query
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
          <Card
            title="Query results"
            style={{ margin: "0 auto", border: "0px" }}
          >
            {/* <Text>{result}</Text> */}

            {/* 这里判断一下，如果有订单信息，就显示订单信息 */}
            {hasEmail && objdata?.orders !== 0 && (
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

            {hasEmail && objdata?.orders === 0 && (
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
                  ✅ Your PixelMug 没有发货
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

            {!hasEmail && objdata?.orders === -1 && (
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
