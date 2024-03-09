import Web3 from "web3";

export const useWeb3 = () => {
  return new Web3(Web3.givenProvider || process.env.RPC_URL);
};
