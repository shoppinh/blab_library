import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const GetFilterMessages = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [filterId, setFilterId] = React.useState("");

  const handleGetFilterMessage = useCallback(async (input) => {
    setError(null);
    try {
      const result = await web3.shh.getFilterMessages(input);
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
      <input
        type="text"
        id="filterId"
        value={filterId}
        onChange={(e) => setFilterId(e.target.value)}
        placeholder="filter ID"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetFilterMessage(filterId)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Get Filter Message
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

export default GetFilterMessages;
