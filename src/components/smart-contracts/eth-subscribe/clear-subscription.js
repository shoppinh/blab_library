import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";

const ClearSubscription = () => {
  const [result, setResult] = React.useState("");
  const { privateWeb3WS: web3 } = useWeb3();
  const [error, setError] = React.useState(null);

  const handleClearSubscription = useCallback(async () => {
    setError(null);
    console.log("hii");
    try {
      const result = web3.eth.clearSubscriptions();
      setResult(result);
    } catch (error) {
      console.error(error);
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
        onClick={handleClearSubscription}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Xóa đăng ký
      </button>
      <div
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        {result}
      </div>
      <div
        style={{
          padding: "10px",
          margin: "10px",
          color: "red",
        }}
      >
        {error?.message || error?.data?.stack || ""}
      </div>
    </div>
  );
};

export default ClearSubscription;
