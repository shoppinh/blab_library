import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const SignAccount = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSign = useCallback(async (data, password) => {
    setError(null);
    try {
      const signature = await web3.eth.personal.sign(
        data,
        process.env.FROM_ADDRESS,
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
        placeholder="Nhập dữ liệu"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập password"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleSign(data, password)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Ký dữ liệu
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
          }}
          name="result"
        >
          <div>{`Signature: ${result}`}</div>
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

export default SignAccount;
