
import { Menu } from './Menu';
import { Game } from './Game';
import { PhoenixFlame } from './PhoenixFlame';
import { Tools } from '../system/Tools';

export const Config = {
  loader: Tools.massiveRequire(),
  scenes: {
    Game,
    PhoenixFlame,
    Menu
  }
};