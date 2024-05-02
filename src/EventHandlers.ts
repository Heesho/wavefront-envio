/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  MemeContract,
  WaveFrontFactoryContract,
  WaveFrontRouterContract,
  DirectoryEntity,
} from "generated";
import {
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handler,
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handlerAsync,
  WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader,
} from "generated/src/Handlers.gen";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const FACTORY_ADDRESS = "0x1552b0DCAC344fFA9702Dbafa6EfA5ebEFB62A82";
export const MULTICALL_ADDRESS = "0xB5ccEA2Ebb813EA818f2571b89A686E137E67889";

WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_loader(
  ({ event, context }) => {
    context.Directory.load(FACTORY_ADDRESS);
  }
);

WaveFrontFactoryContract_WaveFrontFactory__MemeCreated_handler(
  ({ event, context }) => {}
);
