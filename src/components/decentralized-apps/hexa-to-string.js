import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const HexToString = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [input, setInput] = React.useState("");

  const handleConvertHexToNumString = useCallback(async (input) => {
    setError(null);
    if (input) {
      try {
        const result = web3.utils.hexToNumberString(input);
        setResult(result);
      } catch (error) {
        console.error(error);
        setResult(null);
        setError(error);
      }
    } else alert("Giá trị nhập không thể để trống");
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
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập chuỗi"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleConvertHexToNumString(input)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chuyển đổi sang Hex
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
          <div>
            <pre style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
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
          {error?.message || error?.data?.stack || ""}
        </div>
      )}
    </div>
  );
};

export default HexToString;
