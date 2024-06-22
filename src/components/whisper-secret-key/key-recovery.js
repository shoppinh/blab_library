import React, { useCallback } from "react";
import {
  getAccountFromMnemonic,
  getAccountFromPrivateKey,
} from "../../utils/lib";

const GetAccountFromMnemonic = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [mnemonic, setMnemonic] = React.useState("");

  const handleGetAccountFromMnemonic = useCallback(async (mnemonic) => {
    setError(null);
    try {
      const result = getAccountFromMnemonic(mnemonic);
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
        id="mnemonic"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
        placeholder="Nhập Chuỗi mnemonic"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetAccountFromMnemonic(mnemonic)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Khôi phục
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

export default GetAccountFromMnemonic;
