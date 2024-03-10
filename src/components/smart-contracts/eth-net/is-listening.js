import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const IsListening = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGetIsListening = useCallback(async () => {
    setError(null);
    try {
      const result = await web3.eth.net.isListening();

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
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleGetIsListening}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        get is listening
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
          <div>{result.toString()}</div>
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

export default IsListening;
