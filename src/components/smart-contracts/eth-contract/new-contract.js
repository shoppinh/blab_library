import React, { useCallback, useState } from "react";
import greeterAbi from "./abi.json";
import { useWeb3 } from "../../../utils/useWeb3";
const NewContract = () => {
  const [error, setError] = useState(null);
  const { privateWeb3: web3 } = useWeb3();
  const privateKey = process.env.TO_PRIVATE_KEY ?? "";
  const addressContract = "0x8F85D17BE2d15c817B054ecc85CE77a55f7400d6";
  const [input, setInput] = useState("");
  const [signedData, setSignedData] = useState("");
  const [greetedData, setGreetedData] = useState("");
  const [receipt, setReceipt] = useState("");

  const handleCreateNewContract = useCallback(async (input) => {
    setError(null);
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const contract = new web3.eth.Contract(greeterAbi, addressContract);
      const transaction = contract.methods.setGreeting(input);

      const gas = await transaction.estimateGas({ from: account.address });
      const gasPrice = await web3.eth.getGasPrice();
      const data = transaction.encodeABI();
      const nonce = await web3.eth.getTransactionCount(account.address);
      const signedTransaction = await web3.eth.accounts.signTransaction(
        {
          to: addressContract,
          data,
          gas,
          gasPrice,
          nonce,
        },
        privateKey
      );
      setSignedData(signedTransaction);
    } catch (error) {
      console.error(error);
      setSignedData(null);
      setError(error);
    }
  }, []);
  const handleGetGreeting = useCallback(async () => {
    const contract = new web3.eth.Contract(greeterAbi, addressContract);
    console.log("🚀 ~ handleGetGreeting ~ contract:", contract);
    const result = await contract.methods.greet().call();
    console.log("🚀 ~ handleGetGreeting ~ result:", result);
    setGreetedData(result);
  }, []);

  const handleSendSignedTransaction = useCallback(async () => {
    const receipt = await web3.eth.sendSignedTransaction(
      signedData.rawTransaction
    );
    setReceipt(receipt);
  }, [signedData]);
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
        onClick={handleGetGreeting}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        get greeting
      </button>
      {greetedData !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
          name="result"
        >
          <div>
            <pre>{JSON.stringify(greetedData, null, 2)}</pre>
          </div>
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="input"
        style={{
          padding: "10px",
          margin: "10px",
        }}
      />
      <button
        type="button"
        id="ethSubscribe"
        onClick={() => handleCreateNewContract(input)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        sign transaction
      </button>
      {signedData !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
          name="result"
        >
          <div>
            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {JSON.stringify(signedData, null, 2)}
            </pre>
          </div>
        </div>
      )}
      <button
        type="button"
        id="ethSubscribe"
        onClick={handleSendSignedTransaction}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        send signed transaction
      </button>
      {receipt !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-all",
          }}
          name="result"
        >
          <div>
            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {JSON.stringify(receipt, null, 2)}
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

export default NewContract;
