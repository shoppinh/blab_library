import React, { useCallback } from "react";
import { useWeb3 } from "../../utils/useWeb3";

const Upload = () => {
  const { bzz } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const handleUploadFile = useCallback(async (file) => {
    setError(null);
    console.log({
      [file.name]: {
        type: file.type,
        data: file,
      },
    });
    try {
      const result = await bzz.upload({
        [file.name]: {
          type: file.type,
          data: file,
        },
      });
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
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleUploadFile(file)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        tải lên
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

export default Upload;
