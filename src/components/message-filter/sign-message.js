import React, { useCallback, useEffect, useMemo } from "react";
import { useWeb3 } from "../../utils/useWeb3";
import { signMessage, createKeyPair } from "../../utils/lib";
const SignMessage = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const [message, setMessage] = React.useState("");
  const keyPair = useMemo(() => {
    return createKeyPair();
  }, []);
  const handleSignMessage = useCallback(async (privateKey, message) => {
    setError(null);
    if (privateKey && message) {
      try {
        const result = await signMessage(privateKey, message);
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
        id="privateKey"
        value={keyPair.privateKey}
        // onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Nhập Khóa bí mật"
        style={{
          padding: "10px",
          margin: "10px",
        }}
        readOnly
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
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSignMessage(keyPair.privateKey, message)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Ký tin nhắn
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
          {error?.message || error?.data?.stack || ""}
        </div>
      )}
    </div>
  );
};

export default SignMessage;
