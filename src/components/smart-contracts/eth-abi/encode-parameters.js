import React, { useCallback } from "react";
import { useWeb3 } from "../../../utils/useWeb3";
const EncodeParameters = () => {
  const { privateWeb3: web3 } = useWeb3();
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState(null);

  const exampleTypes1 = ["uint256", "string"];
  const exampleParameters1 = ["2345675643", "Hello!%"];
  const exampleTypes2 = ["uint8[]", "bytes32"];
  const exampleParameters2 = [["34", "434"], "0x324567fff"];
  const exampleTypes3 = [
    "uint8[]",
    {
      ParentStruct: {
        propertyOne: "uint256",
        propertyTwo: "uint256",
        ChildStruct: {
          propertyOne: "uint256",
          propertyTwo: "uint256",
        },
      },
    },
  ];
  const exampleParameters3 = [
    ["34", "434"],
    {
      propertyOne: "42",
      propertyTwo: "56",
      ChildStruct: {
        propertyOne: "45",
        propertyTwo: "78",
      },
    },
  ];

  const handleEncodeParameters = useCallback(async (types, parameters) => {
    setError(null);
    try {
      const result = web3.eth.abi.encodeParameters(types, parameters);
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
        onClick={() =>
          handleEncodeParameters(exampleTypes1, exampleParameters1)
        }
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chạy Ví dụ 1{" "}
      </button>
      <button
        type="button"
        id="exampl2"
        onClick={() =>
          handleEncodeParameters(exampleTypes2, exampleParameters2)
        }
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chạy Ví dụ 2{" "}
      </button>
      <button
        type="button"
        id="exampl3"
        onClick={() =>
          handleEncodeParameters(exampleTypes3, exampleParameters3)
        }
        style={{
          padding: "10px",
          margin: "10px",
        }}
      >
        Chạy Ví dụ 3{" "}
      </button>
      {result !== "" && (
        <div
          style={{
            padding: "10px",
            margin: "10px",
            wordBreak: "break-word",
          }}
          name="result"
        >
          {result}
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

export default EncodeParameters;
