import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const NewContract = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleCreateNewContract = useCallback(async () => {
    setError(null);
    console.log("handleCreateNewContract");
    try {
      const newContract = new web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              {
                name: "name",
                type: "string",
              },
            ],
            name: "create",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        process.env.TO_ADDRESS,
        {
          from: process.env.FROM_ADDRESS,
          gas: 3000000,
        }
      );

      setResult(newContract);
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
        onClick={handleCreateNewContract}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        create new contract
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
            <pre>{JSON.stringify(result, null, 2)}</pre>
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

export default NewContract;
