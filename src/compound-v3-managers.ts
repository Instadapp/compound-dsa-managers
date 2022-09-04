import {
  cUSDCv3,
  Approval
} from "../generated/cUSDCv3/cUSDCv3"
import { createOrLoadManager, createOrLoadOwner, createOrLoadTransaction, isDSA, ZERO } from "./utils";

export function handleManagerToggled(event: Approval): void {
  let ownerID = event.params.owner.toHexString();
  let managerID = event.params.spender.toHexString() + "#" + event.params.owner.toHexString();
  let transactionID = event.transaction.hash.toHexString() +  "#" + event.logIndex.toString();

  let transactionData = createOrLoadTransaction(transactionID);
  transactionData.txnIndex = event.transaction.index;
  transactionData.txnLogIndex = event.transactionLogIndex;
  transactionData.from = event.transaction.from;
  transactionData.to = event.transaction.to;
  transactionData.input = event.transaction.input;
  transactionData.blockNumber = event.block.number;
  transactionData.timestamp = event.block.timestamp;
  transactionData.gasLimit = event.block.gasLimit;
  transactionData.blockGasUsed = event.block.gasUsed;
  transactionData.gasPrice = event.transaction.gasPrice;
  transactionData.value = event.transaction.value;
  
  let manager = createOrLoadManager(managerID);
  manager.address = event.params.spender;
  manager.isAllowed = event.params.amount == ZERO ? false : true;
  manager.owner = ownerID;
  manager.isDSA = isDSA(event.params.spender);
  manager.transactionData = transactionID;

  let owner = createOrLoadOwner(ownerID);
  owner.address = event.params.owner;

  transactionData.save();
  manager.save();
  owner.save();  
}
