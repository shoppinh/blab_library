import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const MessageFilter = () => {
  const [result, setResult] = React.useState();
  const { web3 } = useWeb3();
  const [error, setError] = React.useState(null);

  const handleCreateMessageFilter = useCallback(async () => {
    setError(null);
    try {
      const result = await web3.shh.newMessageFilter({});
      setResult(result);
    } catch (error) {
      console.error(error);
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
        onClick={handleCreateMessageFilter}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Create message filter
      </button>
      <div
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        <pre>{JSON.stringify(result, null, 2)}</pre>
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
