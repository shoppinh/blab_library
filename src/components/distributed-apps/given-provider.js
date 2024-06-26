import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const GivenProvider = () => {
  const { bzz } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGetGivenProvider = useCallback(async (url) => {
    setError(null);
    try {
      const a = document.createElement("a");
      a.href = bzz.currentProvider;
      setResult(a.hostname);
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
        onClick={handleGetGivenProvider}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận nhà cung cấp hiện tại
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

export default GivenProvider;
