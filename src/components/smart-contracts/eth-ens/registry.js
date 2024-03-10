import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const Registry = () => {
  const web3 = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleGetRegistry = useCallback(async (url) => {
    setError(null);
    try {
      const result = web3.eth.ens.registry.ens;

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
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleGetRegistry}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        get registry
      </button>
      {result && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
          name="result"
        >
          <div>
            <pre>
              {JSON.stringify(
                {
                  contract: result.contract,
                  setRecord: result.setRecord,
                  setSubnodeRecord: result.setSubnodeRecord,
                  seApprovalForAll: result.setApprovalForAll,
                  isApprovedForAll: result.isApprovedForAll,
                  recordExists: result.recordExists,
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

export default Registry;
