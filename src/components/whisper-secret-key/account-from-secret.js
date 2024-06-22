import React, { useCallback } from "react";
import { getAccountFromPrivateKey } from "../../utils/lib";

const GetAccountFromPassword = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [privateKey, setPrivateKey] = React.useState("");

  const handleGetAccountFromSecret = useCallback(async (privateKey) => {
    setError(null);
    if (privateKey) {
      try {
        const result = await getAccountFromPrivateKey(privateKey);
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
        id="privateKey"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Nhập Khóa bí mật"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetAccountFromSecret(privateKey)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Lấy thông tin tài khoản
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

export default GetAccountFromPassword;
