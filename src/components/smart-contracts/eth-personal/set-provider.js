import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const SetProvider = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [address, setAddress] = React.useState("");

  const handleSetProvider = useCallback(async (address) => {
    setError(null);
    try {
      web3.setProvider(address);
      const result = web3.eth.currentProvider;
      setResult(result);
    } catch (error) {
      console.error("🚀 ~ handleCreateAccount ~ error:", error);
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
        id="provider"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="provider"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSetProvider(address)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Đặt nhà cung cấp
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

export default SetProvider;
