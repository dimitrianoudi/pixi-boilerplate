import { Application } from 'pixi.js';
import { Loader } from './Loader';
import { ScenesManager } from './SceneManager';
import { Stats } from 'stats.ts';
import type { IConfig } from '../types';

export class App {
  private static pixi = new Application();

  static async run(config: IConfig) {
    const container = document.getElementById('app');
    if (!container) throw new Error('App container not found');

    await this.pixi.init({
      resizeTo: window,
      backgroundColor: 0xcccccc,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true
    });

    container.appendChild(this.pixi.canvas);
    this.pixi.canvas.classList.add('pixi-canvas');

    // Stats
    const stats = new Stats();
    stats.showPanel(1);
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '0px';
    stats.dom.style.right = '0px';
    container.appendChild(stats.dom);

    this.pixi.ticker.add((ticker) => {
      stats.begin();
      this.update(ticker.deltaTime);
      stats.end();
    });

    Loader.load(config.loader, () => {
      ScenesManager.init(this.pixi, config.scenes);
      ScenesManager.start('Menu');
    });
  }

  private static update(delta: number) {
    ScenesManager.update(delta);
  }
}