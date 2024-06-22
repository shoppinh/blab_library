import React, { useCallback } from "react";
import { getTransactionReceipt } from "../../utils/lib";

const TransactionInfo = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [hash, setHash] = React.useState(null);
  const handleGetInfo = useCallback(async (hash) => {
    setError(null);

    try {
      const result = await getTransactionReceipt(hash);
      console.log("🚀 ~ handleGetInfo ~ result:", result);
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
        type="text"
        id="hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Nhập Chuỗi băm"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetInfo(hash)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận thông tin
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

export default TransactionInfo;
