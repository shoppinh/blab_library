import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const ShhSubscribeOption = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  console.log("🚀 ~ ShhSubscribeOption ~ result:", result);
  const [error, setError] = React.useState(null);
  const [keyPairId, setKeyPairId] = React.useState("");
  const [symKey, setSymKey] = React.useState();
  const [keyPair, setKeyPair] = React.useState();

  const handleGetSymKey = useCallback(async (input) => {
    setError(null);
    try {
      const result = await web3.shh.newSymKey(input);
      setSymKey(result);
    } catch (error) {
      console.error(error);
      setSymKey(null);
      setError(error);
    }
  }, []);
  const handleGetKeyPair = useCallback(async (input) => {
    setError(null);
    try {
      const result = await web3.shh.newKeyPair(input);
      setKeyPair(result);
    } catch (error) {
      console.error(error);
      setKeyPair(null);
      setError(error);
    }
  }, []);
  const handleSubscribe = useCallback(() => {
    setError(null);
    try {
      const result = web3.shh.subscribe("messages", {
        symKeyID: symKey,
        sig: keyPair,
        topics: ["0x12340000"],
      });
      setResult(result);
    } catch (error) {
      console.error(error);
      setResult(null);
      setError(error);
    }
  }, [symKey, keyPair]);
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
        id="keyPairId"
        value={keyPairId}
        onChange={(e) => setKeyPairId(e.target.value)}
        placeholder="keyPairId"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetSymKey(keyPairId)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận khóa sym
      </button>
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetKeyPair(keyPairId)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận cặp khóa
      </button>
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleSubscribe}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Đăng ký
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
              {JSON.stringify(
                {
                  id: result?.id,
                  lastBlock: result?.lastBlock,
                  subscriptionMethod: result?.subscriptionMethod,
                },
                null,
                2
              )}
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

export default ShhSubscribeOption;
