import React, { useCallback } from "react";
import { hashMessageFunc } from "../../utils/lib";

const HashMessage = () => {
  const [result, setResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleHashMessage = useCallback(async (message) => {
    setError(null);
    try {
      const result = hashMessageFunc(message);
      setResult(result);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập Tin nhắn"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleHashMessage(message)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Mã hóa tin nhắn
      </button>
      <div
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        {result}
      </div>
      <div
        style={{
          padding: "10px",
          margin: "10px",
          color: "red",
        }}
      >
        {error?.message ?? ""}
      </div>
    </div>
  );
};

export default HashMessage;
