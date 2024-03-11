import Web3 from "web3";
import Bzz from "web3-bzz";
export const useWeb3 = () => {
  const web3 = new Web3(Web3.givenProvider || process.env.RPC_URL);
  const bzz = new Bzz(process.env.BZZ_URL);
  bzz.setProvider(process.env.RPC_URL);
  web3.shh.setProvider(process.env.WS_URL);
  return { web3, bzz };
};
