
import { Game } from './Game';
import { Tools } from '../system/Tools';

export const Config = {
  loader: Tools.massiveRequire(),
  scenes: {
    Game
  }
};