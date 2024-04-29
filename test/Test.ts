import assert from "assert";
import { 
  TestHelpers,
  EventsSummaryEntity,
  Meme_ApprovalEntity
} from "generated";
const { MockDb, Meme, Addresses } = TestHelpers;

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
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

describe("Meme contract Approval event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock Meme contract Approval event
  const mockMemeApprovalEvent = Meme.Approval.createMockEvent({
    owner: Addresses.defaultAddress,
    spender: Addresses.defaultAddress,
    value: 0n,
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
  const mockDbUpdated = Meme.Approval.processEvent({
    event: mockMemeApprovalEvent,
    mockDb: mockDbFinal,
  });

  it("Meme_ApprovalEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualMemeApprovalEntity = mockDbUpdated.entities.Meme_Approval.get(
      mockMemeApprovalEvent.transactionHash +
        mockMemeApprovalEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedMemeApprovalEntity: Meme_ApprovalEntity = {
      id:
        mockMemeApprovalEvent.transactionHash +
        mockMemeApprovalEvent.logIndex.toString(),
      owner: mockMemeApprovalEvent.params.owner,
      spender: mockMemeApprovalEvent.params.spender,
      value: mockMemeApprovalEvent.params.value,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMemeApprovalEntity, expectedMemeApprovalEntity, "Actual MemeApprovalEntity should be the same as the expectedMemeApprovalEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      meme_ApprovalCount: MOCK_EVENTS_SUMMARY_ENTITY.meme_ApprovalCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual MemeApprovalEntity should be the same as the expectedMemeApprovalEntity");
  });
});
