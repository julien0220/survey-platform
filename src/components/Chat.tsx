import React, { useState, FC, useRef, useEffect } from "react";
import { Button, Input, Space } from "antd";
import callQwen from "../services/create-ai";
import { getCreateQuestionAiService } from "../services/question";
import {
  CloseOutlined,
  LoadingOutlined,
  RightCircleOutlined
} from "@ant-design/icons";
import styles from "./Chat.module.scss";

const { TextArea } = Input;

interface ChildComponentProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const Chat: FC<ChildComponentProps> = ({ value, onChange }) => {
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "你好，我是 AI 小助手。", sender: "bot" },
    {
      id: 2,
      text: "请输入你想调研的主题，如：大学生恋爱观调查",
      sender: "bot"
    }
  ]);

  //   useEffect(() => {
  //     scrollToBottom(messagesEndRef);
  //   }, [messages]);
  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages, isLoading]);

  const scrollToBottom = (containerRef: React.RefObject<HTMLDivElement>) => {
    const currentRef = messagesEndRef.current as HTMLDivElement | null;
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  };

  const handleMessageSend = async () => {
    if (inputText.trim() === "") return; // 如果输入为空则不发送消息

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user"
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);
    setInputText("");
    const te = JSON.stringify(
      await getCreateQuestionAiService({
        text: inputText,
        history: [{ userMsg: "", assistantMsg: "" }],
        onMessage: (msg: string) => {}
      })
    )
      .split('"')
      .join("");
    const replyMessage = {
      id: messages.length + 2,
      text: te,
      sender: "bot"
    };
    setMessages((prevMessages) => [...prevMessages, replyMessage]);
    setIsLoading(false);
  };

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  return value ? (
    <div className={styles["chat-container"]}>
      <Space>
        <Button
          icon={<CloseOutlined />}
          onClick={() => onChange(false)}
          className={styles.closeButton}
        ></Button>
      </Space>
      <div className={styles["chat-messages-scrollContainer"]}>
        <div className={styles["chat-messages"]} ref={messagesEndRef}>
          {messages.map((message) => (
            <div key={message.id} style={{ display: "flex" }}>
              <div
                className={
                  message.sender === "user"
                    ? styles["chat-message-right"]
                    : styles["chat-message-left"]
                }
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: "flex" }}>
              <div className={styles["chat-message-left"]} ref={messagesEndRef}>
                <LoadingOutlined
                  style={{ marginRight: "4px", color: "green" }}
                />
                正在处理...
              </div>
            </div>
          )}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>
      <div className={styles["chat-input"]}>
        <TextArea
          placeholder="请输入"
          autoSize
          style={{ padding: "6px", border: "#fff" }}
          onChange={handleInputChange}
          value={inputText}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleMessageSend();
            }
          }}
        />
        <Space>
          <Button
            // className={styles.sendButton}
            style={{
              margin: "3px",
              width: "50px",
              textAlign: "center",
              padding: "6px",
              backgroundColor: "#fff",
              marginLeft: "450px",
              border: "#fff"
            }}
            type="default"
            size="middle"
            disabled={inputText.trim() === ""}
            // ghost={true}
            // icon={<RightCircleOutlined className={styles.sendIcon} />}

            icon={
              <RightCircleOutlined
                style={{
                  color: inputText ? "#2672ff" : "#a1a1a1",
                  backgroundColor: "#f5f6fa",
                  padding: "4px",
                  borderRadius: "4px"
                }}
              />
            }
            onClick={handleMessageSend}
          ></Button>
        </Space>
      </div>
    </div>
  ) : null;
};
export default Chat;
