import { Scene } from "./system/Scene";

type SceneConstructor = new () => Scene;

export interface IConfig {
  loader: Record<string, string>;
  scenes: Record<string, SceneConstructor>;
}