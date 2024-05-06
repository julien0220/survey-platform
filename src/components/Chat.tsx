import React, { useState, FC, useRef, useEffect } from "react";
import { Button, Input, Space } from "antd";
import { getCreateQuestionAiService } from "../services/question";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  RightCircleOutlined
} from "@ant-design/icons";
import styles from "./Chat.module.scss";
import { AISurveyType, SurveyItem } from "../constant/index";
import {
  createQuestionService,
  updateQuestionService
} from "../services/question";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

interface ChildComponentProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const Chat: FC<ChildComponentProps> = ({ value, onChange }) => {
  const nav = useNavigate();
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [answerSurvey, setAnswerSurvey] = useState<SurveyItem[]>([]);
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
    let time = 3;
    while (time--) {
      const te = JSON.stringify(
        await getCreateQuestionAiService({
          text: inputText,
          history: [{ userMsg: "", assistantMsg: "" }],
          onMessage: (msg: string) => {}
        })
      );
      const obj = JSON.parse(te);
      handleCreateSurvey(obj);
    }

    const replyMessage = {
      id: messages.length + 2,
      text: "ok",
      sender: "AI-Survey"
    };
    setMessages((prevMessages) => [...prevMessages, replyMessage]);

    setIsLoading(false);
    // setAnswerSurvey([]); 待解决
  };

  const handleCreateSurvey = async (da: AISurveyType) => {
    const data = String(da);
    console.log("da", da);
    console.log("data", data);
    const obj = JSON.parse(data);
    const { title, info, radio, checkbox } = obj;
    const survey = await createQuestionService();
    const componentInfo = {
      fe_id: nanoid(),
      type: "questionInfo",
      title: title,
      props: {
        title: title,
        desc: info
      }
    };
    const radioComponents = radio.map((item: any) => {
      return {
        fe_id: nanoid(),
        title: "单选",
        type: "questionRadio",
        props: {
          title: item.title,
          options: item.options.map((opt: any, index: any) => {
            return {
              value: index,
              text: opt
            };
          }),
          isVertical: true
        }
      };
    });
    const checkboxComponents = checkbox.map((item: any) => {
      return {
        fe_id: nanoid(),
        title: "多选",
        type: "questionCheckbox",
        props: {
          title: item.title + "(多选)",
          list: item.options.map((opt: any, index: any) => {
            return {
              value: index,
              text: opt,
              checked: false
            };
          }),
          isVertical: true
        }
      };
    });
    const res = await updateQuestionService(survey.id || survey._id, {
      title: title,
      desc: info,
      isPublished: true,
      componentList: [componentInfo, ...radioComponents, ...checkboxComponents]
    });
    // console.log("res", res);
    setAnswerSurvey((answerSurvey) => [
      ...answerSurvey,
      {
        fe_id: survey.id || survey._id,
        id: answerSurvey.length + 1,
        title: title,
        desc: info
      }
    ]);
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
                {message.sender !== "AI-Survey" ? (
                  message.text
                ) : (
                  <div>
                    <CheckCircleOutlined
                      style={{ marginRight: "4px", color: "green" }}
                    />
                    以下是问问AI想到的方向,希望能帮到您:
                    {answerSurvey.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          marginTop: "6px",
                          backgroundColor: "#f5f6fa",
                          borderRadius: "4px",
                          padding: "10px"
                        }}
                      >
                        <div>
                          {item.id + `.`}
                          {item.title}
                        </div>
                        <div style={{ marginTop: "6px" }}>{item.desc}</div>
                        <Space>
                          <Button
                            size="small"
                            style={{ marginTop: "6px", fontSize: "12px" }}
                            onClick={() => {
                              nav(`/question/edit/${item.fe_id}`);
                            }}
                          >
                            创建问卷
                          </Button>
                          <Button
                            size="small"
                            style={{ marginTop: "6px", fontSize: "12px" }}
                            onClick={() => {
                              window.open(
                                `http://localhost:3000/question/${item.fe_id}`,
                                "_blank"
                              );
                            }}
                          >
                            预览答题
                          </Button>
                        </Space>
                      </div>
                    ))}
                  </div>
                )}
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
