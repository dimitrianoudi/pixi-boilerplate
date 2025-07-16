import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

type SceneConstructor = new () => Scene;

export class ScenesManager {
  private static app: PIXI.Application;
  private static scenes: Record<string, SceneConstructor>;
  private static current?: Scene;

  static init(app: PIXI.Application, scenes: Record<string, SceneConstructor>) {
    this.app = app;
    this.scenes = scenes;
  }

  static start(name: string) {
    if (this.current) this.app.stage.removeChild(this.current);
    this.current = new this.scenes[name]();
    this.current.init();
    this.app.stage.addChild(this.current);
  }

  static update(delta: number) {
    this.current?.update(delta);
  }
}