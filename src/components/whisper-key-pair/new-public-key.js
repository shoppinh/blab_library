import React, { useCallback } from "react";
import { createPublicKey } from "../../utils/lib";
import { useWeb3 } from "../../utils/useWeb3";

const NewKeyPair = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGenNewKeyPair = useCallback(async () => {
    setError(null);
    try {
      const result = createPublicKey();
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
        onClick={handleGenNewKeyPair}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Tạo
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

export default NewKeyPair;
