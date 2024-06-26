import React, { useCallback } from "react";
import { getBlock } from "../../utils/lib";

const GetInfo = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [blockNumber, setBlockNumber] = React.useState(null);
  const handleGetInfo = useCallback(async (blockNumber) => {
    setError(null);
    if (blockNumber) {
      try {
        const result = await getBlock(blockNumber);
        setResult(result);
      } catch (error) {
        console.error(error);
        setResult(null);
        setError(error);
      }
    } else alert("Giá trị khối không thể để trống");
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
        id="blockNumber"
        value={blockNumber}
        onChange={(e) => setBlockNumber(Number(e.target.value))}
        placeholder="Nhập Số khối"
        style={{
          padding: "10px",
          margin: "10px",
        }}
        va
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleGetInfo(blockNumber)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Nhận thông tin
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

export default GetInfo;
