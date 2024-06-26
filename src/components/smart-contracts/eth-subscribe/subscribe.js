import React, { useCallback, useState } from "react";
import { useWeb3 } from "../../../utils/useWeb3";

const EthSubscribe = () => {
  const [subscribeType, setSubscribeType] = React.useState("newBlockHeaders");
  const [result, setResult] = React.useState("");
  const { privateWeb3WS: web3 } = useWeb3();
  const [error, setError] = React.useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleSubscribe = useCallback((subscribeType) => {
    setError(null);
    setResult("");
    if (subscribeType === "logs") {
      try {
        web3.eth.subscribe(
          subscribeType,
          {
            address: process.env.FROM_ADDRESS,
          },
          (error, result) => {
            if (error) {
              console.error(error);
              setError(error);
            }
            setResult(result);
          }
        );
      } catch (error) {
        console.error(error);
        setError(error);
      }
    } else {
      try {
        if (subscribeType === "newBlockHeaders") {
          setLoadingMessage("Server đang lắng nghe ...");
        }
        web3.eth.subscribe(subscribeType, (error, result) => {
          if (error) {
            console.error(error);
            setError(error);
          }
          if (result) {
            setResult(result);
          }

          setLoadingMessage("");
        });
      } catch (error) {
        console.error(error);
        setError(error);
      }
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
        id="subscribeType"
        onChange={(e) => setSubscribeType(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        <option value="newBlockHeaders">Tiêu đề khối mới</option>
        {/* <option value="logs">nhật ký</option> */}
        <option value="pendingTransactions">đang chờ giao dịch</option>
        {/* <option value="syncing">đồng bộ</option> */}
      </select>
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSubscribe(subscribeType)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Đăng ký
      </button>
      <div
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        {loadingMessage}
      </div>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
        >
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      {error && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            color: "red",
          }}
        >
          {error?.message || error?.data?.stack || ""}
        </div>
      )}
    </div>
  );
};

export default EthSubscribe;
