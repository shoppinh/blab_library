import React, { useCallback } from "react";
import Web3 from "web3";


const EthSubscribe = () => {
  const [subscribeType, setSubscribeType] = React.useState("");
  const [result, setResult] = React.useState("");
    // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const handleSubscribe = useCallback(() => {
    // const result = web3.eth.subscribe(subscribeType, {
    //     address: process.env.USER_ADDRESS
    // }, (error, result) => {
    //   if (error) {
    //     console.error(error);
    //   }
    //   console.log(result);
    // });
    // setResult(result);
  }, []);
  return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>

          <input
              type="text"
              id="type"
              name="type"
              placeholder="Enter your subscription type"
              onChange={(e) => setSubscribeType(e.target.value)}
              style={{
                    padding: "10px",
                    margin: "10px",
              }}
          />
          <button type="button" id="ethSubscribe" onClick={handleSubscribe} style={{
              padding: "10px",
              margin: "10px",
          }}>
              Subscribe
          </button>
          <div>{result}</div>
      </div>
  );
};

export default EthSubscribe;
