import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const CreateAccount = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleCreateAccount = useCallback(async () => {
    setError(null);
    try {
      const createdAccount = web3.eth.accounts.create();

      setResult(createdAccount);
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
        onClick={handleCreateAccount}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        create an account
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
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

export default CreateAccount;
