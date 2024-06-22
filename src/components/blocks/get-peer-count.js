import React, { useCallback } from "react";

const GetPeerCount = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [provider, setProvider] = React.useState("");

  const handleGetPeerCount = useCallback(async () => {
    setError(null);

    try {
      const web3 = new Web3(provider || process.env.RPC_URL);
      const result = await web3.eth.net.getPeerCount();
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
        id="rpcProvider"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        placeholder="Nhập nhà cung cấp"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleGetPeerCount}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận số lượng ngang hàng
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

export default GetPeerCount;
