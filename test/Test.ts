import assert from "assert";
import { 
  TestHelpers,
  EventsSummaryEntity,
  Meme_Meme__BorrowEntity
} from "generated";
const { MockDb, Meme, Addresses } = TestHelpers;

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
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
  waveFrontFactory_WaveFrontFactory__MemeCreatedCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__AffiliateSetCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__BuyCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__ClaimFeesCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__ContributedCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__MarketOpenedCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__MemeCreatedCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__RedeemedCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__SellCount: BigInt(0),
  waveFrontRouter_WaveFrontRouter__StatusUpdatedCount: BigInt(0),
};

describe("Meme contract Meme__Borrow event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock Meme contract Meme__Borrow event
  const mockMemeMeme__BorrowEvent = Meme.Meme__Borrow.createMockEvent({
    account: Addresses.defaultAddress,
    amountBase: 0n,
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
  const mockDbUpdated = Meme.Meme__Borrow.processEvent({
    event: mockMemeMeme__BorrowEvent,
    mockDb: mockDbFinal,
  });

  it("Meme_Meme__BorrowEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualMemeMeme__BorrowEntity = mockDbUpdated.entities.Meme_Meme__Borrow.get(
      mockMemeMeme__BorrowEvent.transactionHash +
        mockMemeMeme__BorrowEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedMemeMeme__BorrowEntity: Meme_Meme__BorrowEntity = {
      id:
        mockMemeMeme__BorrowEvent.transactionHash +
        mockMemeMeme__BorrowEvent.logIndex.toString(),
      account: mockMemeMeme__BorrowEvent.params.account,
      amountBase: mockMemeMeme__BorrowEvent.params.amountBase,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMemeMeme__BorrowEntity, expectedMemeMeme__BorrowEntity, "Actual MemeMeme__BorrowEntity should be the same as the expectedMemeMeme__BorrowEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      meme_Meme__BorrowCount: MOCK_EVENTS_SUMMARY_ENTITY.meme_Meme__BorrowCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual MemeMeme__BorrowEntity should be the same as the expectedMemeMeme__BorrowEntity");
  });
});
