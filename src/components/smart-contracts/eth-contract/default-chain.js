import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const DefaultChain = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");

  const [error, setError] = React.useState(null);

  const handleGetDefaultChain = useCallback(async () => {
    setError(null);
    try {
      web3.eth.Contract.defaultChain = "mainnet";
      setResult(web3.eth.Contract.defaultChain);
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
        onClick={handleGetDefaultChain}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        get default chain
      </button>
      {result && (
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
          {error?.message ?? ""}
        </div>
      )}
    </div>
  );
};

export default DefaultChain;
