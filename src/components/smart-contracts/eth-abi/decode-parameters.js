import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const DecodeParameters = () => {
  const { web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const exampleTypes1 = ["string", "uint256"];
  const exampleHexString1 =
    "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000";
  const exampleTypes2 = [
    {
      type: "string",
      name: "myString",
    },
    {
      type: "uint256",
      name: "myNumber",
    },
  ];
  const exampleHexString2 =
    "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000";
  const exampleTypes3 = [
    "uint8[]",
    {
      ParentStruct: {
        propertyOne: "uint256",
        propertyTwo: "uint256",
        childStruct: {
          propertyOne: "uint256",
          propertyTwo: "uint256",
        },
      },
    },
  ];
  const exampleHexString3 =
    "0x00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000018";

  const handleDecodeParameters = useCallback(async (types, hexString) => {
    setError(null);
    try {
      const result = web3.eth.abi.decodeParameters(types, hexString);
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
        id="exampl1"
        onClick={() => handleDecodeParameters(exampleTypes1, exampleHexString1)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Run example 1
      </button>
      <button
        type="button"
        id="exampl2"
        onClick={() => handleDecodeParameters(exampleTypes2, exampleHexString2)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Run example 2
      </button>
      <button
        type="button"
        id="exampl3"
        onClick={() => handleDecodeParameters(exampleTypes3, exampleHexString3)}
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Run example 3
      </button>
      {result && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-word",
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

export default DecodeParameters;
