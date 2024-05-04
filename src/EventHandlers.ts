/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  MemeContract,
    Meme_Meme__BuyEntity,
    Meme_Meme__ClaimEntity,
    Meme_Meme__MarketOpenedEntity,
    Meme_Meme__ProtocolFeeEntity,
    Meme_Meme__ProviderFeeEntity,
    Meme_Meme__SellEntity,
    Meme_Meme__StatusFeeEntity,
    Meme_Meme__StatusUpdatedEntity,
    Meme_TransferEntity,
  PreMemeContract,
    PreMeme_PreMeme__ContributedEntity,
    PreMeme_PreMeme__RedeemedEntity,
  WaveFrontFactoryContract,
    WaveFrontFactory_WaveFrontFactory__MemeCreatedEntity,
  WaveFrontRouterContract,
    WaveFrontRouter_WaveFrontRouter__AffiliateSetEntity,
    WaveFrontRouter_WaveFrontRouter__BuyEntity,
    WaveFrontRouter_WaveFrontRouter__SellEntity,
EventsSummaryEntity
} from "generated";

export const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
    meme_Meme__BuyCount: BigInt(0),
    meme_Meme__ClaimCount: BigInt(0),
    meme_Meme__MarketOpenedCount: BigInt(0),
    meme_Meme__ProtocolFeeCount: BigInt(0),
    meme_Meme__ProviderFeeCount: BigInt(0),
    meme_Meme__SellCount: BigInt(0),
    meme_Meme__StatusFeeCount: BigInt(0),
    meme_Meme__StatusUpdatedCount: BigInt(0),
    meme_TransferCount: BigInt(0),
    preMeme_PreMeme__ContributedCount: BigInt(0),
    preMeme_PreMeme__RedeemedCount: BigInt(0),
    waveFrontFactory_WaveFrontFactory__MemeCreatedCount: BigInt(0),
    waveFrontRouter_WaveFrontRouter__AffiliateSetCount: BigInt(0),
    waveFrontRouter_WaveFrontRouter__BuyCount: BigInt(0),
    waveFrontRouter_WaveFrontRouter__SellCount: BigInt(0),
};

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
    MemeContract.Meme__MarketOpened.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    MemeContract.Meme__MarketOpened.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    meme_Meme__MarketOpenedCount: currentSummaryEntity.meme_Meme__MarketOpenedCount + BigInt(1),
  };

  const meme_Meme__MarketOpenedEntity: Meme_Meme__MarketOpenedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Meme_Meme__MarketOpened.set(meme_Meme__MarketOpenedEntity);
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
    PreMemeContract.PreMeme__Contributed.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    PreMemeContract.PreMeme__Contributed.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    preMeme_PreMeme__ContributedCount: currentSummaryEntity.preMeme_PreMeme__ContributedCount + BigInt(1),
  };

  const preMeme_PreMeme__ContributedEntity: PreMeme_PreMeme__ContributedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      meme: event.params.meme      ,
      account: event.params.account      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PreMeme_PreMeme__Contributed.set(preMeme_PreMeme__ContributedEntity);
});
    PreMemeContract.PreMeme__Redeemed.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    PreMemeContract.PreMeme__Redeemed.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    preMeme_PreMeme__RedeemedCount: currentSummaryEntity.preMeme_PreMeme__RedeemedCount + BigInt(1),
  };

  const preMeme_PreMeme__RedeemedEntity: PreMeme_PreMeme__RedeemedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      meme: event.params.meme      ,
      account: event.params.account      ,
      amount: event.params.amount      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PreMeme_PreMeme__Redeemed.set(preMeme_PreMeme__RedeemedEntity);
});
    WaveFrontFactoryContract.WaveFrontFactory__MemeCreated.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WaveFrontFactoryContract.WaveFrontFactory__MemeCreated.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    waveFrontFactory_WaveFrontFactory__MemeCreatedCount: currentSummaryEntity.waveFrontFactory_WaveFrontFactory__MemeCreatedCount + BigInt(1),
  };

  const waveFrontFactory_WaveFrontFactory__MemeCreatedEntity: WaveFrontFactory_WaveFrontFactory__MemeCreatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      meme: event.params.meme      ,
      preMeme: event.params.preMeme      ,
      name: event.params.name      ,
      symbol: event.params.symbol      ,
      uri: event.params.uri      ,
      account: event.params.account      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WaveFrontFactory_WaveFrontFactory__MemeCreated.set(waveFrontFactory_WaveFrontFactory__MemeCreatedEntity);
});
    WaveFrontRouterContract.WaveFrontRouter__AffiliateSet.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WaveFrontRouterContract.WaveFrontRouter__AffiliateSet.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    waveFrontRouter_WaveFrontRouter__AffiliateSetCount: currentSummaryEntity.waveFrontRouter_WaveFrontRouter__AffiliateSetCount + BigInt(1),
  };

  const waveFrontRouter_WaveFrontRouter__AffiliateSetEntity: WaveFrontRouter_WaveFrontRouter__AffiliateSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      account: event.params.account      ,
      affiliate: event.params.affiliate      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WaveFrontRouter_WaveFrontRouter__AffiliateSet.set(waveFrontRouter_WaveFrontRouter__AffiliateSetEntity);
});
    WaveFrontRouterContract.WaveFrontRouter__Buy.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WaveFrontRouterContract.WaveFrontRouter__Buy.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    waveFrontRouter_WaveFrontRouter__BuyCount: currentSummaryEntity.waveFrontRouter_WaveFrontRouter__BuyCount + BigInt(1),
  };

  const waveFrontRouter_WaveFrontRouter__BuyEntity: WaveFrontRouter_WaveFrontRouter__BuyEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      meme: event.params.meme      ,
      account: event.params.account      ,
      affiliate: event.params.affiliate      ,
      amountIn: event.params.amountIn      ,
      amountOut: event.params.amountOut      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WaveFrontRouter_WaveFrontRouter__Buy.set(waveFrontRouter_WaveFrontRouter__BuyEntity);
});
    WaveFrontRouterContract.WaveFrontRouter__Sell.loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

    WaveFrontRouterContract.WaveFrontRouter__Sell.handler(({ event, context }) => {
  const summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  const currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  const nextSummaryEntity = {
    ...currentSummaryEntity,
    waveFrontRouter_WaveFrontRouter__SellCount: currentSummaryEntity.waveFrontRouter_WaveFrontRouter__SellCount + BigInt(1),
  };

  const waveFrontRouter_WaveFrontRouter__SellEntity: WaveFrontRouter_WaveFrontRouter__SellEntity = {
    id: event.transactionHash + event.logIndex.toString(),
      meme: event.params.meme      ,
      account: event.params.account      ,
      amountIn: event.params.amountIn      ,
      amountOut: event.params.amountOut      ,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.WaveFrontRouter_WaveFrontRouter__Sell.set(waveFrontRouter_WaveFrontRouter__SellEntity);
});
