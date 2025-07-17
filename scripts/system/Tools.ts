export class Tools {
  static massiveRequire(): Record<string, string> {
    const assets: Record<string, string> = {
      'card.png': './sprites/card.png',
      'flame.png': './sprites/flame.png'
    };
    return assets;
  }
}