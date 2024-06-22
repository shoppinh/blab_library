import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";
import { verifyMessage } from "../../utils/lib";
const MessageFilter = () => {
  const [result, setResult] = React.useState(null);
  const [signature, setSignature] = React.useState(
    "0x8e110be78885e5b6e61620b7f1b4fa455dc2b24997c71c4d011bf28d1e8bd7016256495a24d97b2dcd9771401392ecc0b999c07a4c106a9164f3c5833cdb29791c"
  );
  const [address, setAddress] = React.useState(
    "0x8C92D6D77032f433A30A1D19842Ae2A4d6e4ec6c"
  );
  const [message, setMessage] = React.useState("Hello World");
  const [error, setError] = React.useState(null);

  const handleCreateMessageFilter = useCallback(
    async (signature, message, address) => {
      setError(null);
      try {
        const result = verifyMessage(signature, message, address);
        setResult(result);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    []
  );
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
        id="signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        placeholder="Nhập Chữ ký"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập Tin nhắn"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập Địa chỉ"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleCreateMessageFilter(signature, message, address)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Kiểm tra
      </button>
      <div
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        {result !== null ? result.toString() : ""}
      </div>
      <div
        style={{
          padding: "10px",
          margin: "10px",
          color: "red",
        }}
      >
        {error?.message ?? ""}
      </div>
    </div>
  );
};

export default MessageFilter;
