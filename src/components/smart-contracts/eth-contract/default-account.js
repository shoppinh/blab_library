import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const DefaultAccount = () => {
  const { privateWeb3: web3 } = useWeb3();
  console.log(web3.eth.currentProvider);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGetDefaultAccount = useCallback(async () => {
    setError(null);
    try {
      const defaultAccount = web3.eth.defaultAccount;

      setResult(defaultAccount);
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
        onClick={handleGetDefaultAccount}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        get default account
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

export default DefaultAccount;
