/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  // MemeContract,
  // PreMemeContract,
  WaveFrontFactoryContract,
  WaveFrontRouterContract,
  DirectoryEntity,
  // Token,
  // Account,
  // TokenPosition,
  // Swap,
  // SwapHourData,
  // SwapDayData,
} from "generated";
import {
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handler,
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader,
} from "generated/src/Handlers.gen";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const FACTORY_ADDRESS = "0x25a12591e63a4367e5fB3Af66cc4CDDB7F02aDec";

WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader(
  ({ event, context }) => {
    context.Directory.load(FACTORY_ADDRESS);
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
  }
);
