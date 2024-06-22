import React, { useCallback, useState } from "react";
import greeterAbi from "./abi.json";
import { useWeb3 } from "../../../utils/useWeb3";
const NewContract = () => {
  const [error, setError] = useState(null);
  console.log("🚀 ~ NewContract ~ error:", error);
  const { privateWeb3: web3 } = useWeb3();
  const privateKey = process.env.FROM_PRIVATE_KEY ?? "";
  const addressContract = process.env.GREETER_CONTRACT_ADDRESS;
  const [input, setInput] = useState("");
  const [signedData, setSignedData] = useState("");
  const [greetedData, setGreetedData] = useState("");
  const [receipt, setReceipt] = useState("");

  const handleCreateNewContract = useCallback(
    async (input) => {
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
    },
    [privateKey, addressContract]
  );
  const handleGetGreeting = useCallback(async () => {
    const contract = new web3.eth.Contract(greeterAbi, addressContract);
    try {
      const result = await contract.methods.greet().call();
      setGreetedData(result);
    } catch (error) {
      console.log("🚀 ~ handleGetGreeting ~ error:", error);
      setError(error);
    }
  }, [addressContract]);

  const handleSendSignedTransaction = useCallback(async () => {
    try {
      const receipt = await web3.eth.sendSignedTransaction(
        signedData.rawTransaction
      );
      setReceipt(receipt);
    } catch (error) {
      setError(error);
    }
  }, [signedData.rawTransaction]);
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
        Nhận lời chào
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
        placeholder="Nhập"
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
        Ký giao dịch
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
        Gửi giao dịch đã ký
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
          {error?.message || error?.data?.stack || ""}
        </div>
      )}
    </div>
  );
};

export default NewContract;
