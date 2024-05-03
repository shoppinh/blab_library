import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const Download = () => {
  const { bzz } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [bzzHash, setBzzHash] = React.useState(null);
  const handleDownload = useCallback(async (bzzHash) => {
    setError(null);

    try {
      const result = await bzz.download(bzzHash);
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
        onChange={(e) => {
          setBzzHash(e.target.value);
        }}
        name="bzzHash"
        placeholder="bzzHash"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleDownload(bzzHash)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Tải xuống
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
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Download;
