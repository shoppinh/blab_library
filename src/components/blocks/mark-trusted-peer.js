import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const MarkTrustedBeer = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [input, setInput] = React.useState("");
  const handleMarkTrustedPeer = useCallback(async (input) => {
    setError(null);

    try {
      const result = await web3.shh.markTrustedPeer(input);

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
        id="eNode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ENode of trusted peer"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleMarkTrustedPeer(input)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Mark Trusted Peer
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

export default MarkTrustedBeer;
