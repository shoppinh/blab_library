import React, { useCallback } from "react";
import Web3 from "web3";

const EthSubscribe = () => {
  const [subscribeType, setSubscribeType] = React.useState("");
  const [result, setResult] = React.useState("");
  const handleSubscribe = useCallback(() => {
    const result = Web3.eth.subscribe(subscribeType, {}, (error, result) => {
      if (error) {
        console.error(error);
      }
      console.log(result);
    });
    setResult(result);
  }, []);
  return (
    <>
      <input
        type="text"
        id="ethAddress"
        name="ethAddress"
        placeholder="Enter your subscription address"
        onChange={(e) => setSubscribeType(e.target.value)}
      />
      <button type="button" id="ethSubscribe" onClick={handleSubscribe}>
        Subscribe
      </button>
      <div>{result}</div>
    </>
  );
};

export default EthSubscribe;
