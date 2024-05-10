/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  MemeContract,
  PreMemeContract,
  WaveFrontFactoryContract,
  WaveFrontRouterContract,
  DirectoryEntity,
  AccountEntity,
  TokenEntity,
  TokenPositionEntity,
  SwapEntity,
  SwapHourDataEntity,
  SwapDayDataEntity,
} from "generated";
import {
  MemeContract_Meme__Buy_handler,
  MemeContract_Meme__Buy_loader,
  MemeContract_Meme__Claim_handler,
  MemeContract_Meme__Claim_loader,
  MemeContract_Meme__MarketOpened_handler,
  MemeContract_Meme__MarketOpened_loader,
  MemeContract_Meme__ProtocolFee_handler,
  MemeContract_Meme__ProtocolFee_loader,
  MemeContract_Meme__ProviderFee_handler,
  MemeContract_Meme__ProviderFee_loader,
  MemeContract_Meme__Sell_handler,
  MemeContract_Meme__Sell_loader,
  MemeContract_Meme__StatusFee_handler,
  MemeContract_Meme__StatusFee_loader,
  MemeContract_Meme__StatusUpdated_handler,
  MemeContract_Meme__StatusUpdated_loader,
  MemeContract_Transfer_handler,
  MemeContract_Transfer_loader,
  PreMemeContract_PreMeme__Contributed_handler,
  PreMemeContract_PreMeme__Contributed_loader,
  PreMemeContract_PreMeme__Redeemed_handler,
  PreMemeContract_PreMeme__Redeemed_loader,
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handler,
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader,
  WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_handler,
  WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_loader,
  WaveFrontRouterContract_WaveFrontRouter__Buy_handler,
  WaveFrontRouterContract_WaveFrontRouter__Buy_loader,
  WaveFrontRouterContract_WaveFrontRouter__Sell_handler,
  WaveFrontRouterContract_WaveFrontRouter__Sell_loader,
} from "generated/src/Handlers.gen";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const FACTORY_ADDRESS = "0x25a12591e63a4367e5fB3Af66cc4CDDB7F02aDec";
const INITIAL_PRICE = 100000000000n;
const PREMARKET_DURATION = 600n;
const STATUS_UPDATE_FEE = 1000000000000000000000n;

WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader(
  ({ event, context }) => {
    context.Directory.load(FACTORY_ADDRESS);
    context.Account.load(event.params.account);
    context.contractRegistration.addMeme(event.params.meme);
    context.contractRegistration.addPreMeme(event.params.preMeme);
    context.Token.load(event.params.meme);
    context.TokenPosition.load(
      event.params.meme.toString() + "-" + event.params.account.toString(),
      {}
    );
  }
);

WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handler(
  ({ event, context }) => {
    let directory = context.Directory.get(FACTORY_ADDRESS);
    if (directory) {
      const existingDirectory: DirectoryEntity = {
        ...directory,
        index: directory.index + 1n,
      };
      context.Directory.set(existingDirectory);
    } else {
      directory = {
        id: FACTORY_ADDRESS,
        index: 1n,
        volume: 0n,
        treasuryFees: 0n,
      };
      context.Directory.set(directory);
    }

    let account = context.Account.get(event.params.account);
    if (!account) {
      account = {
        id: event.params.account,
        providerFees: 0n,
        collectionFees: 0n,
        leaderFees: 0n,
        referrals: 0n,
      };
      context.Account.set(account);
    }

    let token = context.Token.get(event.params.meme);
    if (!token) {
      token = {
        id: event.params.meme,
        name: event.params.name,
        symbol: event.params.symbol,
        uri: event.params.uri,
        creator: event.params.account,
        leader: event.params.account,
        contributed: 0n,
        marketPrice: INITIAL_PRICE,
        circulatingSupply: 0n,
        marketCap: 0n,
        contributors: 0n,
        holders: 0n,
        volume: 0n,
        isOpen: false,
        openAt: BigInt(event.blockTimestamp) + PREMARKET_DURATION,
        priceChange: "UP",
      };
      context.Token.set(token);
    }

    let tokenPosition = context.TokenPosition.get(
      event.params.meme.toString() + "-" + event.params.account.toString()
    );
    if (!tokenPosition) {
      tokenPosition = {
        id:
          event.params.meme.toString() + "-" + event.params.account.toString(),
        account_id: event.params.account,
        token_id: event.params.meme,
        contributed: 0n,
        balance: 0n,
        created: true,
        leader: true,
      };
      context.TokenPosition.set(tokenPosition);
    }
  }
);

PreMemeContract_PreMeme__Contributed_loader(({ event, context }) => {
  context.Account.load(event.params.account);
  context.Token.load(event.params.meme);
  context.TokenPosition.load(
    event.params.meme.toString() + "-" + event.params.account.toString(),
    {}
  );
});

PreMemeContract_PreMeme__Contributed_handler(({ event, context }) => {
  let account = context.Account.get(event.params.account);
  if (!account) {
    account = {
      id: event.params.account,
      providerFees: 0n,
      collectionFees: 0n,
      leaderFees: 0n,
      referrals: 0n,
    };
    context.Account.set(account);
  }

  let token = context.Token.get(event.params.meme)!;
  const existingToken: TokenEntity = {
    ...token,
    contributed: token.contributed + event.params.amount,
  };
  context.Token.set(existingToken);

  let tokenPosition = context.TokenPosition.get(
    event.params.meme.toString() + "-" + event.params.account.toString()
  );
  if (!tokenPosition) {
    tokenPosition = {
      id: event.params.meme.toString() + "-" + event.params.account.toString(),
      account_id: event.params.account,
      token_id: event.params.meme,
      contributed: 0n,
      balance: 0n,
      created: true,
      leader: true,
    };
    context.TokenPosition.set(tokenPosition);
  }
  if (tokenPosition.contributed == 0n) {
    const existingToken: TokenEntity = {
      ...token,
      contributors: token!.contributors + 1n,
    };
    context.Token.set(existingToken);
  }
  const existingTokenPosition: TokenPositionEntity = {
    ...tokenPosition,
    contributed: tokenPosition.contributed + event.params.amount,
  };
  context.TokenPosition.set(existingTokenPosition);
});

PreMemeContract_PreMeme__Redeemed_loader(({ event, context }) => {
  context.TokenPosition.load(
    event.params.meme.toString() + "-" + event.params.account.toString(),
    {}
  );
});

PreMemeContract_PreMeme__Redeemed_handler(({ event, context }) => {
  let tokenPosition = context.TokenPosition.get(
    event.params.meme.toString() + "-" + event.params.account.toString()
  )!;
  const existingTokenPosition: TokenPositionEntity = {
    ...tokenPosition,
    contributed: 0n,
  };
  context.TokenPosition.set(existingTokenPosition);
});

MemeContract_Meme__Buy_loader(({ event, context }) => {
  context.Directory.load(FACTORY_ADDRESS);
  context.Token.load(event.srcAddress);
});

MemeContract_Meme__Buy_handler(({ event, context }) => {
  let directory = context.Directory.get(FACTORY_ADDRESS)!;
  const existingDirectory: DirectoryEntity = {
    ...directory,
    volume: directory.volume + event.params.amountIn,
  };
  context.Directory.set(existingDirectory);

  let token = context.Token.get(event.srcAddress)!;
  const existingToken: TokenEntity = {
    ...token,
    marketPrice: event.params.amountIn / event.params.amountOut,
    priceChange: "UP",
    circulatingSupply: token.circulatingSupply + event.params.amountOut,
    marketCap:
      (event.params.amountIn / event.params.amountOut) *
      (token.circulatingSupply + event.params.amountOut),
    volume: token.volume + event.params.amountIn,
  };
  context.Token.set(existingToken);
});

MemeContract_Meme__Sell_loader(({ event, context }) => {
  context.Directory.load(FACTORY_ADDRESS);
  context.Token.load(event.srcAddress);
});

MemeContract_Meme__Sell_handler(({ event, context }) => {
  let directory = context.Directory.get(FACTORY_ADDRESS)!;
  const existingDirectory: DirectoryEntity = {
    ...directory,
    volume: directory.volume + event.params.amountOut,
  };
  context.Directory.set(existingDirectory);

  let token = context.Token.get(event.srcAddress)!;
  const existingToken: TokenEntity = {
    ...token,
    marketPrice: event.params.amountOut / event.params.amountIn,
    priceChange: "DOWN",
    circulatingSupply: token.circulatingSupply - event.params.amountOut,
    marketCap:
      (event.params.amountOut / event.params.amountIn) *
      (token.circulatingSupply - event.params.amountOut),
    volume: token.volume + event.params.amountIn,
  };
  context.Token.set(existingToken);
});

MemeContract_Meme__Claim_loader(({ event, context }) => {
  context.Account.load(event.params.account);
});

MemeContract_Meme__Claim_handler(({ event, context }) => {
  let account = context.Account.get(event.params.account)!;
  const existingAccount: AccountEntity = {
    ...account,
    collectionFees: account.collectionFees + event.params.amountBase,
  };
  context.Account.set(existingAccount);
});

MemeContract_Meme__StatusFee_loader(({ event, context }) => {
  context.Account.load(event.params.account);
});

MemeContract_Meme__StatusFee_handler(({ event, context }) => {
  let account = context.Account.get(event.params.account)!;
  const existingAccount: AccountEntity = {
    ...account,
    leaderFees: account.leaderFees + event.params.amountBase,
  };
  context.Account.set(existingAccount);
});

MemeContract_Meme__ProviderFee_loader(({ event, context }) => {
  context.Account.load(event.params.account);
});

MemeContract_Meme__ProviderFee_handler(({ event, context }) => {
  let account = context.Account.get(event.params.account)!;
  const existingAccount: AccountEntity = {
    ...account,
    providerFees: account.providerFees + event.params.amountBase,
  };
  context.Account.set(existingAccount);
});

MemeContract_Meme__ProtocolFee_loader(({ event, context }) => {
  context.Directory.load(FACTORY_ADDRESS);
});

MemeContract_Meme__ProtocolFee_handler(({ event, context }) => {
  let directory = context.Directory.get(FACTORY_ADDRESS)!;
  const existingDirectory: DirectoryEntity = {
    ...directory,
    treasuryFees: directory.treasuryFees + event.params.amountBase,
  };
  context.Directory.set(existingDirectory);
});

MemeContract_Meme__StatusUpdated_loader(({ event, context }) => {
  context.Token.load(event.srcAddress);
  context.TokenPosition.load(
    event.srcAddress.toString() + "-" + event.params.oldAccount.toString(),
    {}
  );
  context.TokenPosition.load(
    event.srcAddress.toString() + "-" + event.params.newAccount.toString(),
    {}
  );
});

MemeContract_Meme__StatusUpdated_handler(({ event, context }) => {
  let token = context.Token.get(event.srcAddress)!;

  let oldLeaderTokenPosition = context.TokenPosition.get(
    event.srcAddress.toString() + "-" + event.params.oldAccount.toString()
  )!;
  const existingOldLeaderTokenPosition: TokenPositionEntity = {
    ...oldLeaderTokenPosition,
    leader: false,
  };
  context.TokenPosition.set(existingOldLeaderTokenPosition);

  let newLeaderTokenPosition = context.TokenPosition.get(
    event.srcAddress.toString() + "-" + event.params.newAccount.toString()
  )!;
  const existingNewLeaderTokenPosition: TokenPositionEntity = {
    ...newLeaderTokenPosition,
    leader: true,
  };
  context.TokenPosition.set(existingNewLeaderTokenPosition);

  const existingToken: TokenEntity = {
    ...token,
    leader: event.params.newAccount,
    circulatingSupply: token.circulatingSupply - STATUS_UPDATE_FEE,
  };
});

MemeContract_Meme__MarketOpened_loader(({ event, context }) => {
  context.Token.load(event.srcAddress);
});

MemeContract_Meme__MarketOpened_handler(({ event, context }) => {
  let token = context.Token.get(event.srcAddress)!;
  const existingToken: TokenEntity = {
    ...token,
    isOpen: true,
  };
  context.Token.set(existingToken);
});

MemeContract_Transfer_loader(({ event, context }) => {
  context.Token.load(event.srcAddress);
  context.Account.load(event.params.to);
  context.Account.load(event.params.from);
  context.TokenPosition.load(
    event.srcAddress.toString() + "-" + event.params.to.toString(),
    {}
  );
  context.TokenPosition.load(
    event.srcAddress.toString() + "-" + event.params.from.toString(),
    {}
  );
});

MemeContract_Transfer_handler(({ event, context }) => {
  let token = context.Token.get(event.srcAddress)!;

  let toAccount = context.Account.get(event.params.to);
  if (!toAccount) {
    toAccount = {
      id: event.params.to,
      providerFees: 0n,
      collectionFees: 0n,
      leaderFees: 0n,
      referrals: 0n,
    };
    context.Account.set(toAccount);
  }

  let toTokenPosition = context.TokenPosition.get(
    event.srcAddress.toString() + "-" + event.params.to.toString()
  );
  if (!toTokenPosition) {
    toTokenPosition = {
      id: event.srcAddress.toString() + "-" + event.params.to.toString(),
      account_id: event.params.to,
      token_id: event.srcAddress,
      contributed: 0n,
      balance: 0n,
      created: false,
      leader: false,
    };
    context.TokenPosition.set(toTokenPosition);
  }
  if (toTokenPosition.balance == 0n) {
    const existingToken: TokenEntity = {
      ...token,
      holders: token.holders + 1n,
    };
    context.Token.set(existingToken);
  }
  const existingToTokenPosition: TokenPositionEntity = {
    ...toTokenPosition,
    balance: toTokenPosition.balance + event.params.value,
  };
  context.TokenPosition.set(existingToTokenPosition);

  let fromTokenPosition = context.TokenPosition.get(
    event.srcAddress.toString() + "-" + event.params.from.toString()
  );
  if (!fromTokenPosition) {
    fromTokenPosition = {
      id: event.srcAddress.toString() + "-" + event.params.from.toString(),
      account_id: event.params.from,
      token_id: event.srcAddress,
      contributed: 0n,
      balance: 0n,
      created: false,
      leader: false,
    };
    context.TokenPosition.set(fromTokenPosition);
  }
  const existingFromTokenPosition: TokenPositionEntity = {
    ...fromTokenPosition,
    balance: fromTokenPosition.balance - event.params.value,
  };
  context.TokenPosition.set(existingFromTokenPosition);
  if (fromTokenPosition.balance < 0n) {
    const existingFromTokenPosition: TokenPositionEntity = {
      ...fromTokenPosition,
      balance: 0n,
    };
    context.TokenPosition.set(existingFromTokenPosition);
  }
  if (fromTokenPosition.balance == 0n) {
    const existingToken: TokenEntity = {
      ...token,
      holders: token.holders - 1n,
    };
    context.Token.set(existingToken);
  }
});

WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_loader(
  ({ event, context }) => {
    context.Account.load(event.params.account);
  }
);

WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_handler(
  ({ event, context }) => {
    let account = context.Account.get(event.params.account)!;
    if (!account) {
      account = {
        id: event.params.account,
        providerFees: 0n,
        collectionFees: 0n,
        leaderFees: 0n,
        referrals: 0n,
      };
      context.Account.set(account);
    }
    const existingAccount: AccountEntity = {
      ...account,
      referrals: account.referrals + 1n,
    };
    context.Account.set(existingAccount);
  }
);

WaveFrontRouterContract_WaveFrontRouter__Buy_loader(({ event, context }) => {
  context.Account.load(event.params.account);
  context.Swap.load(event.transactionHash, {});
  let hourIndex = event.blockTimestamp / 3600;
  let dayIndex = event.blockTimestamp / 86400;
  context.SwapHourData.load(event.params.meme.toString() + "-" + hourIndex, {});
  context.SwapDayData.load(event.params.meme.toString() + "-" + dayIndex, {});
});

WaveFrontRouterContract_WaveFrontRouter__Buy_handler(({ event, context }) => {
  let account = context.Account.get(event.params.account);
  if (!account) {
    account = {
      id: event.params.account,
      providerFees: 0n,
      collectionFees: 0n,
      leaderFees: 0n,
      referrals: 0n,
    };
    context.Account.set(account);
  }

  let swap = context.Swap.get(event.transactionHash);
  if (!swap) {
    swap = {
      id: event.transactionHash,
      blockNumber: event.blockNumber,
      timestamp: event.blockTimestamp,
      account_id: event.params.account,
      token_id: event.params.meme,
      action: "BUY",
      baseIn: event.params.amountIn,
      baseOut: 0n,
      tokenIn: 0n,
      tokenOut: event.params.amountOut,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
    };
    context.Swap.set(swap);
  }

  let hourIndex = event.blockTimestamp / 3600;
  let hourStartTimestamp = hourIndex * 3600;
  let swapHourData = context.SwapHourData.get(
    event.params.meme.toString() + "-" + hourIndex
  );
  if (!swapHourData) {
    swapHourData = {
      id: event.params.meme.toString() + "-" + hourIndex,
      token_id: event.params.meme,
      timestamp: hourStartTimestamp,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      hourlyVolume: event.params.amountIn,
    };
    context.SwapHourData.set(swapHourData);
  } else {
    const existingSwapHourData: SwapHourDataEntity = {
      ...swapHourData,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      hourlyVolume: swapHourData.hourlyVolume + event.params.amountIn,
    };
    context.SwapHourData.set(existingSwapHourData);
  }

  let dayIndex = event.blockTimestamp / 86400;
  let dayStartTimestamp = dayIndex * 86400;
  let swapDayData = context.SwapDayData.get(
    event.params.meme.toString() + "-" + dayIndex
  );
  if (!swapDayData) {
    swapDayData = {
      id: event.params.meme.toString() + "-" + dayIndex,
      token_id: event.params.meme,
      timestamp: dayStartTimestamp,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      dailyVolume: event.params.amountIn,
    };
    context.SwapDayData.set(swapDayData);
  } else {
    const existingSwapDayData: SwapDayDataEntity = {
      ...swapDayData,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      dailyVolume: swapDayData.dailyVolume + event.params.amountIn,
    };
    context.SwapDayData.set(existingSwapDayData);
  }
});

WaveFrontRouterContract_WaveFrontRouter__Sell_loader(({ event, context }) => {
  context.Swap.load(event.transactionHash, {});
  let hourIndex = event.blockTimestamp / 3600;
  let dayIndex = event.blockTimestamp / 86400;
  context.SwapHourData.load(event.params.meme.toString() + "-" + hourIndex, {});
  context.SwapDayData.load(event.params.meme.toString() + "-" + dayIndex, {});
});

WaveFrontRouterContract_WaveFrontRouter__Sell_handler(({ event, context }) => {
  let swap = context.Swap.get(event.transactionHash);
  if (!swap) {
    swap = {
      id: event.transactionHash,
      blockNumber: event.blockNumber,
      timestamp: event.blockTimestamp,
      account_id: event.params.account,
      token_id: event.params.meme,
      action: "SELL",
      baseIn: 0n,
      baseOut: event.params.amountOut,
      tokenIn: event.params.amountIn,
      tokenOut: 0n,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
    };
    context.Swap.set(swap);
  }

  let hourIndex = event.blockTimestamp / 3600;
  let hourStartTimestamp = hourIndex * 3600;
  let swapHourData = context.SwapHourData.get(
    event.params.meme.toString() + "-" + hourIndex
  );
  if (!swapHourData) {
    swapHourData = {
      id: event.params.meme.toString() + "-" + hourIndex,
      token_id: event.params.meme,
      timestamp: hourStartTimestamp,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      hourlyVolume: event.params.amountIn,
    };
    context.SwapHourData.set(swapHourData);
  } else {
    const existingSwapHourData: SwapHourDataEntity = {
      ...swapHourData,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      hourlyVolume: swapHourData.hourlyVolume + event.params.amountIn,
    };
    context.SwapHourData.set(existingSwapHourData);
  }

  let dayIndex = event.blockTimestamp / 86400;
  let dayStartTimestamp = dayIndex * 86400;
  let swapDayData = context.SwapDayData.get(
    event.params.meme.toString() + "-" + dayIndex
  );
  if (!swapDayData) {
    swapDayData = {
      id: event.params.meme.toString() + "-" + dayIndex,
      token_id: event.params.meme,
      timestamp: dayStartTimestamp,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      dailyVolume: event.params.amountIn,
    };
    context.SwapDayData.set(swapDayData);
  } else {
    const existingSwapDayData: SwapDayDataEntity = {
      ...swapDayData,
      marketPrice: event.params.marketPrice,
      floorPrice: event.params.floorPrice,
      dailyVolume: swapDayData.dailyVolume + event.params.amountIn,
    };
    context.SwapDayData.set(existingSwapDayData);
  }
});
