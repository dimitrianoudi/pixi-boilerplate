import * as PIXI from 'pixi.js';

export abstract class Scene extends PIXI.Container {
  abstract init(): void;
  abstract update(delta: number): void;
}