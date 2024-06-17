// ethers v5.7.2

import { ethers } from "ethers";
import { arrayify, hexDataSlice } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";
import { entropyToMnemonic } from "@ethersproject/hdnode";
import { recoverAddress } from "@ethersproject/transactions";
import { hashMessage } from "@ethersproject/hash";
import { Buffer } from "buffer";

const provider = new ethers.providers.JsonRpcProvider(
  "http://117.4.240.104:8545"
);
async function getBlock(blockNumber) {
  return provider.getBlock(blockNumber);
}

async function getCurrentBlock() {
  return provider.getBlockNumber();
}

async function getTransactionsInBlock(blockNumber) {
  const block = await provider.getBlock(blockNumber);
  return block.transactions;
}

async function getTransactionReceipt(txHash) {
  return provider.getTransactionReceipt(txHash);
}

function createKeyPair() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    mnemonic: wallet.mnemonic.phrase,
  };
}

function createPrivateKey() {
  const result = createKeyPair();
  return {
    privateKey: result.privateKey,
  };
}

function createPublicKey() {
  const result = createKeyPair();
  return {
    publicKey: result.publicKey,
  };
}

function showKeyPair() {
  return createKeyPair();
}

function createKeyPairFromPassword(password) {
  const entropy = arrayify(
    hexDataSlice(keccak256(Buffer.from(password)), 0, 16)
  );

  const mnemonic = entropyToMnemonic(entropy);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
  };
}

function getAccountFromPrivateKey(privateKey) {
  const wallet = new ethers.Wallet(privateKey);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
  };
}

function getAccountFromMnemonic(mnemonic) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
  };
}

function checkKeypairValidity(keypair) {
  const wallet = new ethers.Wallet(keypair.privateKey);
  return wallet.publicKey === keypair.publicKey;
}

function hashMessageFunc(message) {
  return hashMessage(message);
}

async function signMessage(privateKey, message) {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.signMessage(message);
}

function verifyMessage(signature, message, address) {
  return recoverAddress(hashMessage(message), signature) === address;
}

// async function main() {
//   console.log(hashMessageFunc("Hello World"));

//   console.log(
//     await signMessage(
//       "0xd61f3aa744725f4f1d0dfcff889e4e2566d762e7b1d4aadf74eed27096d0e5e2",
//       "Hello World"
//     )
//   );

//   console.log(
//     verifyMessage(
//       "0x8e110be78885e5b6e61620b7f1b4fa455dc2b24997c71c4d011bf28d1e8bd7016256495a24d97b2dcd9771401392ecc0b999c07a4c106a9164f3c5833cdb29791c",
//       "Hello World",
//       "0x8C92D6D77032f433A30A1D19842Ae2A4d6e4ec6c"
//     )
//   );
// }

// main();

export {
  createKeyPair,
  createKeyPairFromPassword,
  getAccountFromPrivateKey,
  getAccountFromMnemonic,
  checkKeypairValidity,
  hashMessageFunc,
  signMessage,
  verifyMessage,
  getBlock,
  getCurrentBlock,
  getTransactionsInBlock,
  getTransactionReceipt,
  showKeyPair,
  createPublicKey,
  createPrivateKey,
};
