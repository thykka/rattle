import { init as initPlayer } from './player.js';
import { init as initView } from './canvasView.js';
import { init as initLoop } from './loop.js';
import { ProductType, init as initProduct } from './products.js';
import {
  ContractType,
  init as initContract,
  attach as attachContract,
} from './contracts.js';
import {
  init as initMachine,
  attach as attachMachine,
  MachineType,
  stockProduct,
} from './machines.js';
import { LocationType } from './locations.js';

const player = initPlayer();
const view = initView(document.body);
const loop = initLoop(player, view.draw);

loop.start();

attachContract(initContract(ContractType.StartBusiness), player);

attachMachine(
  initMachine(MachineType.ToyVendingMachine),
  LocationType.Home,
  player
);

stockProduct(
  initProduct(ProductType.BubblegumBall),
  Object.keys(player.machines)[0],
  player
);
