import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const DecodeParameter = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [type, setType] = React.useState("");
  const [hexString, setHexString] = React.useState("");

  const handleDecodeParameter = useCallback(async (type, hexString) => {
    setError(null);
    if (type && hexString) {
      try {
        const result = web3.eth.abi.decodeParameter(type, hexString);
        setResult(result);
      } catch (error) {
        console.error(error);
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
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Nhập Nhập kiểu"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="text"
        value={hexString}
        onChange={(e) => setHexString(e.target.value)}
        placeholder="Nhập chuỗi HEX"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleDecodeParameter(type, hexString)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Giải mã tham số
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-word",
          }}
          name="result"
        >
          {result}
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

export default DecodeParameter;
