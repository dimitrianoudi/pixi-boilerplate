import * as PIXI from 'pixi.js';

export class Loader {
  static load(assets: Record<string, string>, onComplete: () => void) {
    const loader = PIXI.Assets;
    const bundleAssets = Object.entries(assets).map(([key, path]) => ({
      alias: key,
      src: path
    }));
    loader.addBundle('main', bundleAssets);
    loader.loadBundle('main').then(onComplete);
  }
}