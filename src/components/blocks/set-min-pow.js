import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const SetMinPow = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [input, setInput] = React.useState(0);
  const handleSetMinPow = useCallback(async (input) => {
    setError(null);

    try {
      const result = await web3.shh.setMinPoW(input);
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
        type="number"
        id="minPow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message size"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSetMinPow(input)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Đặt MinPoW
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
          <div>{JSON.stringify(result, null, 2)}</div>
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

export default SetMinPow;
