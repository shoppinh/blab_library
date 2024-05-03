import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const Pick = () => {
  const { bzz } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState("file");
  const handlePick = useCallback(async (type) => {
    setError(null);

    try {
      if (type === "file") {
        const result = await bzz.pick.file();
        setResult(result);
      } else if (type === "directory") {
        const result = await bzz.pick.directory();
        setResult(result);
      } else if (type === "data") {
        const result = await bzz.pick.data();
        setResult(result);
      }
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
      <select
        id="ethSubscribe"
        style={{ padding: "10px", margin: "10px" }}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="file">file</option>
        <option value="directory">directory</option>
        <option value="data">data</option>
      </select>
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handlePick(selectedType)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chọn
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

export default Pick;
