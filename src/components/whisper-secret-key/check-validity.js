import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";
import { checkKeypairValidity } from "../../utils/lib";

const CheckValidity = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGenerateCheckValidity = useCallback(
    async (privateKey, publicKey) => {
      setError(null);
      try {
        const result = checkKeypairValidity({
          privateKey,
          publicKey,
        });
        setResult(result);
      } catch (error) {
        console.error(error);
        setResult(null);
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
        id="privateKey"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Nhập Khóa bí mật"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="text"
        id="publicKey"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        placeholder="Nhập Khóa công khai"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGenerateCheckValidity(privateKey, publicKey)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Kiểm tra
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

export default CheckValidity;
