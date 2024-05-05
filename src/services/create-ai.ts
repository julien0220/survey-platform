type HistoryItem = {
  userMsg: string;
  assistantMsg: string;
};

type ChatHistory = HistoryItem[];

// 直接调会跨域，需要配反代
const URL =
  "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
const API_KEY = "sk-2f72f8a38f5042fab27ff576a1ddc43a";

export default async function callQwen({
  text,
  history,
  onMessage
}: {
  text: string;
  history: ChatHistory;
  onMessage: (msg: string) => void;
}) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "X-DashScope-SSE": "enable"
    },
    body: getParams(text, history)
  });
  const reader = response.body?.getReader();

  if (!reader) return;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read();
    const utf8Decoder = new TextDecoder("utf-8");
    const resultText = value ? utf8Decoder.decode(value, { stream: true }) : "";
    try {
      const data = getResult(resultText);
      console.log("qwen data", data);
      if (data.output.text) {
        onMessage(data.output.text);
      }
    } catch (e) {
      throw Error("error");
    }
    if (done) {
      break;
    }
  }
}

function getParams(message: string, history: ChatHistory) {
  return JSON.stringify({
    model: "qwen-max",
    input: {
      prompt: message,
      history: getHistory(history)
    },
    parameters: {
      incremental_output: true
    }
  });
}

function getHistory(history: ChatHistory) {
  const array = [];
  // 排除最后一条 history，因为是本次刚发的消息
  for (let i = 0; i < history.length - 1; i++) {
    const chat = history[i];
    array.push({
      user: chat.userMsg,
      bot: chat.assistantMsg
    });
  }
  return array;
}

function getResult(resultText: string) {
  const lines = resultText.split("\n");
  for (const line of lines) {
    if (line.startsWith("data:")) {
      const data = JSON.parse(line.slice(5));
      return data;
    }
  }
}
