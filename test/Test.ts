import assert from "assert";
import { 
  TestHelpers,
  NFTPresaleManager_EIP712DomainChanged
} from "generated";
const { MockDb, NFTPresaleManager } = TestHelpers;

describe("NFTPresaleManager contract EIP712DomainChanged event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for NFTPresaleManager contract EIP712DomainChanged event
  const event = NFTPresaleManager.EIP712DomainChanged.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("NFTPresaleManager_EIP712DomainChanged is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await NFTPresaleManager.EIP712DomainChanged.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualNFTPresaleManagerEIP712DomainChanged = mockDbUpdated.entities.NFTPresaleManager_EIP712DomainChanged.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedNFTPresaleManagerEIP712DomainChanged: NFTPresaleManager_EIP712DomainChanged = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualNFTPresaleManagerEIP712DomainChanged, expectedNFTPresaleManagerEIP712DomainChanged, "Actual NFTPresaleManagerEIP712DomainChanged should be the same as the expectedNFTPresaleManagerEIP712DomainChanged");
  });
});
