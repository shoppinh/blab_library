import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const SetMessageSize = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  console.log("🚀 ~ SetMessageSize ~ result:", result);
  const [error, setError] = React.useState(null);
  const [input, setInput] = React.useState(0);
  const handleGetInfo = useCallback(async (input) => {
    setError(null);

    try {
      const result = await web3.shh.setMaxMessageSize(input);
      setResult(result);
    } catch (error) {
      console.error(error);
      setResult(null);
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
        type="number"
        id="messageSize"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message size"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetInfo(input)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Set Message Size
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
          name="result"
        >
          <div>{JSON.stringify(result, null, 2)}</div>
        </div>
      )}
      {error && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            color: "red",
          }}
          name="error"
        >
          {error?.message ?? ""}
        </div>
      )}
    </div>
  );
};

export default SetMessageSize;
