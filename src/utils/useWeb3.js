import Web3 from "web3";
import Bzz from "web3-bzz";
export const useWeb3 = () => {
  const web3 = new Web3(Web3.givenProvider || process.env.RPC_MAINNET);
  const privateWeb3 = new Web3(Web3.givenProvider || process.env.RPC_URL);
  const bzz = new Bzz(process.env.RPC_MAINNET);
  bzz.setProvider(process.env.RPC_MAINNET);
  web3.shh.setProvider(process.env.WS_URL);
  privateWeb3.shh.setProvider(process.env.WS_MAINNET);
  return { web3, bzz, privateWeb3 };
};
