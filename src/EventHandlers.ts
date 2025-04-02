/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  NFTPresaleManager,
  NFTPresaleManager_EIP712DomainChanged,
  NFTPresaleManager_MaxNFTPerWalletUpdated,
  NFTPresaleManager_NFTPurchased,
  NFTPresaleManager_OwnershipTransferred,
  NFTPresaleManager_PaymentTokenUpdated,
  NFTPresaleManager_ReferralCommissionPaid,
  NFTPresaleManager_RemovedFromWhitelist,
  NFTPresaleManager_SaleRoundCreated,
  NFTPresaleManager_Whitelisted,
} from "generated";

NFTPresaleManager.EIP712DomainChanged.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_EIP712DomainChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  };

  context.NFTPresaleManager_EIP712DomainChanged.set(entity);
});

NFTPresaleManager.MaxNFTPerWalletUpdated.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_MaxNFTPerWalletUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    roundId: event.params.roundId,
    maxNFTPerWallet: event.params.maxNFTPerWallet,
  };

  context.NFTPresaleManager_MaxNFTPerWalletUpdated.set(entity);
});

NFTPresaleManager.NFTPurchased.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_NFTPurchased = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    buyer: event.params.buyer,
    tokenId: event.params.tokenId,
  };

  context.NFTPresaleManager_NFTPurchased.set(entity);

  // Handle Count entity
  const countId = `${event.srcAddress}_count`
  let newCount = BigInt(1);
  let existCount = await context.NFTPresaleManager_Count.get(countId);
  if (existCount) {
    newCount = BigInt(existCount.count) + BigInt(1);
  }
  context.NFTPresaleManager_Count.set({
    id: countId,
    count: newCount,
  });

  // Handle User entity
  const userId = event.params.buyer.toLowerCase(); // Normalize address
  let user = await context.NFTPresaleManager_User.get(userId);
  if (!user) {
    user = { id: userId }; // Initialize empty item list
    context.NFTPresaleManager_User.set(user);
  }

  // Handle Item entity
  const itemId = `${event.srcAddress}_${event.params.tokenId}`;
  let item = await context.NFTPresaleManager_Item.get(itemId);

  if (item) {
  } else {
    // Create new item
    item = {
      id: itemId,
      tokenId: event.params.tokenId,
      amount: BigInt(1),
      tx_hash: event.transaction.hash,
      owner_id: userId, // Link to user
    };
  }
  context.NFTPresaleManager_Item.set(item);
});

NFTPresaleManager.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.NFTPresaleManager_OwnershipTransferred.set(entity);
});

NFTPresaleManager.PaymentTokenUpdated.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_PaymentTokenUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token,
    accepted: event.params.accepted,
  };

  context.NFTPresaleManager_PaymentTokenUpdated.set(entity);
});

NFTPresaleManager.ReferralCommissionPaid.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_ReferralCommissionPaid = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    referrer: event.params.referrer,
    buyer: event.params.buyer,
    amount: event.params.amount,
  };

  context.NFTPresaleManager_ReferralCommissionPaid.set(entity);
});

NFTPresaleManager.RemovedFromWhitelist.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_RemovedFromWhitelist = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
  };

  context.NFTPresaleManager_RemovedFromWhitelist.set(entity);
});

NFTPresaleManager.SaleRoundCreated.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_SaleRoundCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    roundId: event.params.roundId,
  };

  context.NFTPresaleManager_SaleRoundCreated.set(entity);
});

NFTPresaleManager.Whitelisted.handler(async ({ event, context }) => {
  const entity: NFTPresaleManager_Whitelisted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
  };

  context.NFTPresaleManager_Whitelisted.set(entity);
});
