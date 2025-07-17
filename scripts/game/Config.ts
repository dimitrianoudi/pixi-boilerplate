
import { Menu } from './Menu';
import { AceOfShadows } from './AceOfShadows';
import { PhoenixFlame } from './PhoenixFlame';
import { Tools } from '../system/Tools';

export const Config = {
  loader: Tools.massiveRequire(),
  scenes: {
    AceOfShadows,
    PhoenixFlame,
    Menu
  }
};