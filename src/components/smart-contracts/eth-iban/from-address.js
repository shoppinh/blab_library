import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const FromAddress = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [address, setAddress] = React.useState("");

  const handleCreateIbanFromAddress = useCallback(async (address) => {
    setError(null);
    if (address) {
      try {
        const result = web3.eth.Iban.fromAddress(address);
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
        id="IBanAddress"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập điah chỉ IBan"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleCreateIbanFromAddress(address)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Tạo IBAN từ địa chỉ
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
            <pre>{JSON.stringify(result, null, 2)}</pre>
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

export default FromAddress;
