export class Tools {

  static massiveRequire(): Record<string, string> {
    const assets: Record<string, string> = {
      'card.png': '/card.png',
      'flame.png': '/flame.png'
    };
    
    return assets;
  }
}