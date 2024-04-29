/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  MemeContract,
    Meme_ApprovalEntity,
    Meme_Meme__BorrowEntity,
    Meme_Meme__BurnEntity,
    Meme_Meme__BuyEntity,
    Meme_Meme__ClaimEntity,
    Meme_Meme__DonationEntity,
    Meme_Meme__FeesEntity,
    Meme_Meme__ProtocolFeeEntity,
    Meme_Meme__ProviderFeeEntity,
    Meme_Meme__RepayEntity,
    Meme_Meme__ReserveBurnEntity,
    Meme_Meme__SellEntity,
    Meme_Meme__StatusFeeEntity,
    Meme_Meme__StatusUpdatedEntity,
    Meme_TransferEntity,
  WavefrontFactoryContract,
    WavefrontFactory_OwnershipTransferredEntity,
    WavefrontFactory_WaveFrontFactory__MemeCreatedEntity,
    WavefrontFactory_WaveFrontFactory__MinAmountInUpdatedEntity,
    WavefrontFactory_WaveFrontFactory__TreasuryUpdatedEntity,
EventsSummaryEntity
} from "generated";

export const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
    meme_ApprovalCount: BigInt(0),
    meme_Meme__BorrowCount: BigInt(0),
    meme_Meme__BurnCount: BigInt(0),
    meme_Meme__BuyCount: BigInt(0),
    meme_Meme__ClaimCount: BigInt(0),
    meme_Meme__DonationCount: BigInt(0),
    meme_Meme__FeesCount: BigInt(0),
    meme_Meme__ProtocolFeeCount: BigInt(0),
    meme_Meme__ProviderFeeCount: BigInt(0),
    meme_Meme__RepayCount: BigInt(0),
    meme_Meme__ReserveBurnCount: BigInt(0),
    meme_Meme__SellCount: BigInt(0),
    meme_Meme__StatusFeeCount: BigInt(0),
    meme_Meme__StatusUpdatedCount: BigInt(0),
    meme_TransferCount: BigInt(0),
    wavefrontFactory_OwnershipTransferredCount: BigInt(0),
    wavefrontFactory_WaveFrontFactory__MemeCreatedCount: BigInt(0),
    wavefrontFactory_WaveFrontFactory__MinAmountInUpdatedCount: BigInt(0),
    wavefrontFactory_WaveFrontFactory__TreasuryUpdatedCount: BigInt(0),
};

    MemeContract.Approval.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Approval.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_ApprovalCount: currentSummaryEntity.meme_ApprovalCount + BigInt(1),
  };

  const meme_ApprovalEntity: Meme_ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      owner: event.params.owner      ,
      spender: event.params.spender      ,
      value: event.params.value      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Approval.set(meme_ApprovalEntity);
});
    MemeContract.Meme__Borrow.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Borrow.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__BorrowCount: currentSummaryEntity.meme_Meme__BorrowCount + BigInt(1),
  };

  const meme_Meme__BorrowEntity: Meme_Meme__BorrowEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Borrow.set(meme_Meme__BorrowEntity);
});
    MemeContract.Meme__Burn.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Burn.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__BurnCount: currentSummaryEntity.meme_Meme__BurnCount + BigInt(1),
  };

  const meme_Meme__BurnEntity: Meme_Meme__BurnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountMeme: event.params.amountMeme      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Burn.set(meme_Meme__BurnEntity);
});
    MemeContract.Meme__Buy.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Buy.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__BuyCount: currentSummaryEntity.meme_Meme__BuyCount + BigInt(1),
  };

  const meme_Meme__BuyEntity: Meme_Meme__BuyEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      amountIn: event.params.amountIn      ,
      amountOut: event.params.amountOut      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Buy.set(meme_Meme__BuyEntity);
});
    MemeContract.Meme__Claim.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Claim.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__ClaimCount: currentSummaryEntity.meme_Meme__ClaimCount + BigInt(1),
  };

  const meme_Meme__ClaimEntity: Meme_Meme__ClaimEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Claim.set(meme_Meme__ClaimEntity);
});
    MemeContract.Meme__Donation.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Donation.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__DonationCount: currentSummaryEntity.meme_Meme__DonationCount + BigInt(1),
  };

  const meme_Meme__DonationEntity: Meme_Meme__DonationEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Donation.set(meme_Meme__DonationEntity);
});
    MemeContract.Meme__Fees.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Fees.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__FeesCount: currentSummaryEntity.meme_Meme__FeesCount + BigInt(1),
  };

  const meme_Meme__FeesEntity: Meme_Meme__FeesEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
      amountMeme: event.params.amountMeme      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Fees.set(meme_Meme__FeesEntity);
});
    MemeContract.Meme__ProtocolFee.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__ProtocolFee.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__ProtocolFeeCount: currentSummaryEntity.meme_Meme__ProtocolFeeCount + BigInt(1),
  };

  const meme_Meme__ProtocolFeeEntity: Meme_Meme__ProtocolFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__ProtocolFee.set(meme_Meme__ProtocolFeeEntity);
});
    MemeContract.Meme__ProviderFee.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__ProviderFee.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__ProviderFeeCount: currentSummaryEntity.meme_Meme__ProviderFeeCount + BigInt(1),
  };

  const meme_Meme__ProviderFeeEntity: Meme_Meme__ProviderFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__ProviderFee.set(meme_Meme__ProviderFeeEntity);
});
    MemeContract.Meme__Repay.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Repay.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__RepayCount: currentSummaryEntity.meme_Meme__RepayCount + BigInt(1),
  };

  const meme_Meme__RepayEntity: Meme_Meme__RepayEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Repay.set(meme_Meme__RepayEntity);
});
    MemeContract.Meme__ReserveBurn.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__ReserveBurn.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__ReserveBurnCount: currentSummaryEntity.meme_Meme__ReserveBurnCount + BigInt(1),
  };

  const meme_Meme__ReserveBurnEntity: Meme_Meme__ReserveBurnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      amountMeme: event.params.amountMeme      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__ReserveBurn.set(meme_Meme__ReserveBurnEntity);
});
    MemeContract.Meme__Sell.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__Sell.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__SellCount: currentSummaryEntity.meme_Meme__SellCount + BigInt(1),
  };

  const meme_Meme__SellEntity: Meme_Meme__SellEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      amountIn: event.params.amountIn      ,
      amountOut: event.params.amountOut      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__Sell.set(meme_Meme__SellEntity);
});
    MemeContract.Meme__StatusFee.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__StatusFee.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__StatusFeeCount: currentSummaryEntity.meme_Meme__StatusFeeCount + BigInt(1),
  };

  const meme_Meme__StatusFeeEntity: Meme_Meme__StatusFeeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      amountBase: event.params.amountBase      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__StatusFee.set(meme_Meme__StatusFeeEntity);
});
    MemeContract.Meme__StatusUpdated.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__StatusUpdated.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__StatusUpdatedCount: currentSummaryEntity.meme_Meme__StatusUpdatedCount + BigInt(1),
  };

  const meme_Meme__StatusUpdatedEntity: Meme_Meme__StatusUpdatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      status: event.params.status      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__StatusUpdated.set(meme_Meme__StatusUpdatedEntity);
});
    MemeContract.Transfer.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Transfer.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_TransferCount: currentSummaryEntity.meme_TransferCount + BigInt(1),
  };

  const meme_TransferEntity: Meme_TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      from: event.params.from      ,
      to: event.params.to      ,
      value: event.params.value      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Transfer.set(meme_TransferEntity);
});
    WavefrontFactoryContract.OwnershipTransferred.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WavefrontFactoryContract.OwnershipTransferred.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wavefrontFactory_OwnershipTransferredCount: currentSummaryEntity.wavefrontFactory_OwnershipTransferredCount + BigInt(1),
  };

  const wavefrontFactory_OwnershipTransferredEntity: WavefrontFactory_OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      previousOwner: event.params.previousOwner      ,
      newOwner: event.params.newOwner      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WavefrontFactory_OwnershipTransferred.set(wavefrontFactory_OwnershipTransferredEntity);
});
    WavefrontFactoryContract.WaveFrontFactory__MemeCreated.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WavefrontFactoryContract.WaveFrontFactory__MemeCreated.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wavefrontFactory_WaveFrontFactory__MemeCreatedCount: currentSummaryEntity.wavefrontFactory_WaveFrontFactory__MemeCreatedCount + BigInt(1),
  };

  const wavefrontFactory_WaveFrontFactory__MemeCreatedEntity: WavefrontFactory_WaveFrontFactory__MemeCreatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      index: event.params.index      ,
      meme: event.params.meme      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WavefrontFactory_WaveFrontFactory__MemeCreated.set(wavefrontFactory_WaveFrontFactory__MemeCreatedEntity);
});
    WavefrontFactoryContract.WaveFrontFactory__MinAmountInUpdated.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WavefrontFactoryContract.WaveFrontFactory__MinAmountInUpdated.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wavefrontFactory_WaveFrontFactory__MinAmountInUpdatedCount: currentSummaryEntity.wavefrontFactory_WaveFrontFactory__MinAmountInUpdatedCount + BigInt(1),
  };

  const wavefrontFactory_WaveFrontFactory__MinAmountInUpdatedEntity: WavefrontFactory_WaveFrontFactory__MinAmountInUpdatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      minAmountIn: event.params.minAmountIn      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WavefrontFactory_WaveFrontFactory__MinAmountInUpdated.set(wavefrontFactory_WaveFrontFactory__MinAmountInUpdatedEntity);
});
    WavefrontFactoryContract.WaveFrontFactory__TreasuryUpdated.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WavefrontFactoryContract.WaveFrontFactory__TreasuryUpdated.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    wavefrontFactory_WaveFrontFactory__TreasuryUpdatedCount: currentSummaryEntity.wavefrontFactory_WaveFrontFactory__TreasuryUpdatedCount + BigInt(1),
  };

  const wavefrontFactory_WaveFrontFactory__TreasuryUpdatedEntity: WavefrontFactory_WaveFrontFactory__TreasuryUpdatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      treasury: event.params.treasury      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WavefrontFactory_WaveFrontFactory__TreasuryUpdated.set(wavefrontFactory_WaveFrontFactory__TreasuryUpdatedEntity);
});
