import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const ToIBan = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [address, setAddress] = React.useState("");

  const handleConvertToIBanAddress = useCallback(async (address) => {
    setError(null);
    try {
      const result = web3.eth.Iban.toIban(address);
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
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập địa chỉ"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleConvertToIBanAddress(address)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chuyển đổi sang địa chỉ IBAN
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
          {error?.message ?? ""}
        </div>
      )}
    </div>
  );
};

export default ToIBan;
