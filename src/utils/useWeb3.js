import Web3 from "web3";
import Bzz from "web3-bzz";
export const useWeb3 = () => {
  // mainnet
  const web3 = new Web3(process.env.RPC_MAINNET || process.env.WS_URL);
  const bzz = new Bzz(process.env.RPC_MAINNET);

  web3.shh.setProvider(process.env.WS_URL);
  // private network
  const privateWeb3 = new Web3(process.env.RPC_URL);
  const privateWeb3WS = new Web3(process.env.WS_URL);
  return { web3, bzz, privateWeb3, privateWeb3WS };
};
