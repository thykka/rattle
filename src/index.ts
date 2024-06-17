import { init as initPlayer } from './player.js';
import { init as initView } from './canvasView.js';
import { init as initLoop } from './loop.js';
import {
  ContractType,
  init as initContract,
  attach as attachContract,
} from './contracts.js';

const player = initPlayer();
const view = initView(document.body);
const loop = initLoop(player, view.draw);

loop.start();

attachContract(initContract(ContractType.StartBusiness), player);
