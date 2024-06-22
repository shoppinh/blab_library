import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const Hexa = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [keyPairId, setKeyPairId] = React.useState("");

  const handleConvertToHex = useCallback(async (input) => {
    setError(null);
    try {
      const result = web3.utils.toHex(input);
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
        id="keyPairId"
        value={keyPairId}
        onChange={(e) => setKeyPairId(e.target.value)}
        placeholder="Nhập ID của cặp khóa"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleConvertToHex(keyPairId)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận khóa sym
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
          {error?.message ?? ""}
        </div>
      )}
    </div>
  );
};

export default Hexa;
