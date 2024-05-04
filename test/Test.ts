import assert from "assert";
import { 
  TestHelpers,
  EventsSummaryEntity,
  Meme_Meme__BuyEntity
} from "generated";
const { MockDb, Meme, Addresses } = TestHelpers;

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
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

describe("Meme contract Meme__Buy event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock Meme contract Meme__Buy event
  const mockMemeMeme__BuyEvent = Meme.Meme__Buy.createMockEvent({
    from: Addresses.defaultAddress,
    to: Addresses.defaultAddress,
    amountIn: 0n,
    amountOut: 0n,
    mockEventData: {
      chainId: 1,
      blockNumber: 0,
      blockTimestamp: 0,
      blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      srcAddress: Addresses.defaultAddress,
      transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      transactionIndex: 0,
      logIndex: 0,
    },
  });

  // Processing the event
  const mockDbUpdated = Meme.Meme__Buy.processEvent({
    event: mockMemeMeme__BuyEvent,
    mockDb: mockDbFinal,
  });

  it("Meme_Meme__BuyEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualMemeMeme__BuyEntity = mockDbUpdated.entities.Meme_Meme__Buy.get(
      mockMemeMeme__BuyEvent.transactionHash +
        mockMemeMeme__BuyEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedMemeMeme__BuyEntity: Meme_Meme__BuyEntity = {
      id:
        mockMemeMeme__BuyEvent.transactionHash +
        mockMemeMeme__BuyEvent.logIndex.toString(),
      from: mockMemeMeme__BuyEvent.params.from,
      to: mockMemeMeme__BuyEvent.params.to,
      amountIn: mockMemeMeme__BuyEvent.params.amountIn,
      amountOut: mockMemeMeme__BuyEvent.params.amountOut,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMemeMeme__BuyEntity, expectedMemeMeme__BuyEntity, "Actual MemeMeme__BuyEntity should be the same as the expectedMemeMeme__BuyEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      meme_Meme__BuyCount: MOCK_EVENTS_SUMMARY_ENTITY.meme_Meme__BuyCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual MemeMeme__BuyEntity should be the same as the expectedMemeMeme__BuyEntity");
  });
});
