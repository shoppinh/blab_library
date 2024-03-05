import React from "react";
import Layout from "@theme/Layout";
import * as _ from "lodash";

export default function MyReactPage() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
