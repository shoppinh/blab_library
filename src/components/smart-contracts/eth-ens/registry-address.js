import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const RegistryAddress = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGetRegistryAddress = useCallback(async (url) => {
    setError(null);
    try {
      const result = web3.eth.ens.registryAddress;

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
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleGetRegistryAddress}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận địa chỉ
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

export default RegistryAddress;
