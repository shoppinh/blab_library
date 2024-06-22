import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const DefaultBlock = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");

  const [error, setError] = React.useState(null);

  const handleGetDefaultBlock = useCallback(async () => {
    setError(null);
    try {
      const defaultBlock = web3.eth.Contract.defaultBlock;

      setResult(defaultBlock);
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
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleGetDefaultBlock}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận khối mặc định
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
          <div>{result}</div>
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

export default DefaultBlock;
