import React, { useCallback, useState } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const SignTransaction = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignTransaction = useCallback(async (data, password) => {
    setError(null);
    try {
      const signature = await web3.eth.personal.signTransaction(
        {
          from: process.env.FROM_ADDRESS,
          to: process.env.TO_ADDRESS,
          value: "1000000000000000000",
          data,
          gasPrice: "20000000000",
          gas: "21000",
        },
        password
      );
      setResult(signature);
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
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter your data"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSignTransaction(data, password)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        ký giao dịch
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
          }}
          name="result"
        >
          <pre>{JSON.stringify(result, null, 2)}</pre>
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

export default SignTransaction;
