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
  // Swap,
  // SwapHourData,
  // SwapDayData,
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

MemeContract_Transfer_loader(({ event, context }) => {});

MemeContract_Transfer_handler(({ event, context }) => {});

WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_loader(
  ({ event, context }) => {}
);

WaveFrontRouterContract_WaveFrontRouter__AffiliateSet_handler(
  ({ event, context }) => {}
);

WaveFrontRouterContract_WaveFrontRouter__Buy_loader(({ event, context }) => {});

WaveFrontRouterContract_WaveFrontRouter__Buy_handler(
  ({ event, context }) => {}
);

WaveFrontRouterContract_WaveFrontRouter__Sell_loader(
  ({ event, context }) => {}
);

WaveFrontRouterContract_WaveFrontRouter__Sell_handler(
  ({ event, context }) => {}
);
