import {
  Address,
  BigInt,
  Bytes,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
import { Approval } from "../generated/cUSDCv3/cUSDCv3";
import { TransactionData, Owner, Manager } from "../generated/schema";
import { InstaList } from "../generated/cUSDCv3/InstaList";

export const ZERO = new BigInt(0);

export function isDSA(account: Address): boolean {
  let listAddress = Address.fromBytes(
    Address.fromHexString("0x4c8a1BEb8a87765788946D6B19C6C6355194AbEb")
  );
  let instaList = InstaList.bind(listAddress);

  let isDSA = instaList.accountID(account) == ZERO ? false : true;
  return isDSA;
}

//loads or creates smart owner
export function createOrLoadOwner(id: string): Owner {
  let account = Owner.load(id);
  if (account == null) {
    account = new Owner(id);
    account.address = new Address(0);
  }
  return account;
}

//loads or creates smart owner
export function createOrLoadManager(id: string): Manager {
  let account = Manager.load(id);
  if (account == null) {
    account = new Manager(id);
    account.address = new Address(0);
    account.owner = "";
    account.isAllowed = false;
    account.isDSA = false;
    account.transactionData = "";
  }
  return account;
}

//creates instance for new transaction or loads existing one
export function createOrLoadTransaction(id: string): TransactionData {
  let txn = TransactionData.load(id);
  if (txn == null) {
    txn = new TransactionData(id);
    txn.txnIndex = ZERO;
    txn.txnLogIndex = ZERO;
    txn.from = new Address(0);
    txn.to = new Address(0);
    txn.input = new Bytes(0);
    txn.blockNumber = ZERO;
    txn.timestamp = ZERO;
    txn.blockGasUsed = ZERO;
    txn.gasLimit = ZERO;
    txn.gasPrice = ZERO;
    txn.value = ZERO;
  }
  return txn;
}
