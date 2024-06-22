import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";
const SetProvider = () => {
  const { bzz } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [address, setAddress] = React.useState("");

  const handleSetProvider = useCallback(async (address) => {
    setError(null);
    if (address) {
      try {
        bzz.setProvider(address);
        const result = bzz.currentProvider;
        setResult(result);
      } catch (error) {
        console.error("🚀 ~ handleCreateAccount ~ error:", error);
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
        id="provider"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập nhà cung cấp"
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
          {error?.message || error?.data?.stack || ""}
        </div>
      )}
    </div>
  );
};

export default SetProvider;
