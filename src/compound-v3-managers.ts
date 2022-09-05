import {
  cUSDCv3,
  Approval,
  AllowCall,
  AllowBySigCall,
} from "../generated/cUSDCv3/cUSDCv3";
import {
  createOrLoadManager,
  createOrLoadOwner,
  createOrLoadTransaction,
  isDSA,
  ZERO,
} from "./utils";

export function handleManagerToggledByAllow(call: AllowCall): void {
  let ownerID =
    call.transaction.from.toHexString() + "#" + call.to.toHexString();
  let managerID = call.inputs.manager.toHexString() + "#" + ownerID;
  let transactionID =
    call.transaction.hash.toHexString() +
    "#" +
    call.transaction.index.toString();

  let transactionData = createOrLoadTransaction(transactionID);
  transactionData.txnIndex = call.transaction.index;
  transactionData.from = call.transaction.from;
  transactionData.to = call.transaction.to;
  transactionData.input = call.transaction.input;
  transactionData.blockNumber = call.block.number;
  transactionData.timestamp = call.block.timestamp;
  transactionData.gasLimit = call.block.gasLimit;
  transactionData.blockGasUsed = call.block.gasUsed;
  transactionData.gasPrice = call.transaction.gasPrice;
  transactionData.value = call.transaction.value;

  let manager = createOrLoadManager(managerID);
  manager.address = call.inputs.manager;
  manager.isAllowed = call.inputs.isAllowed_;
  manager.owner = ownerID;
  manager.market = call.to;
  manager.isDSA = isDSA(call.inputs.manager);
  manager.transactionData = transactionID;

  let owner = createOrLoadOwner(ownerID);
  owner.address = call.transaction.from;
  owner.market = call.to;

  transactionData.save();
  manager.save();
  owner.save();
}

export function handleMnaagerToggledByPermit(call: AllowBySigCall): void {
  let ownerID = call.inputs.owner.toHexString() + "#" + call.to.toHexString();
  let managerID = call.inputs.manager.toHexString() + "#" + ownerID;
  let transactionID =
    call.transaction.hash.toHexString() +
    "#" +
    call.transaction.index.toString();

  let transactionData = createOrLoadTransaction(transactionID);
  transactionData.txnIndex = call.transaction.index;
  transactionData.from = call.transaction.from;
  transactionData.to = call.transaction.to;
  transactionData.input = call.transaction.input;
  transactionData.blockNumber = call.block.number;
  transactionData.timestamp = call.block.timestamp;
  transactionData.gasLimit = call.block.gasLimit;
  transactionData.blockGasUsed = call.block.gasUsed;
  transactionData.gasPrice = call.transaction.gasPrice;
  transactionData.value = call.transaction.value;

  let manager = createOrLoadManager(managerID);
  manager.address = call.inputs.manager;
  manager.isAllowed = call.inputs.isAllowed_;
  manager.owner = ownerID;
  manager.market = call.to;
  manager.isDSA = isDSA(call.inputs.manager);
  manager.transactionData = transactionID;

  let owner = createOrLoadOwner(ownerID);
  owner.address = call.inputs.owner;
  owner.market = call.to;

  transactionData.save();
  manager.save();
  owner.save();
}
