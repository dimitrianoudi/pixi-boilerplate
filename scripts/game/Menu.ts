import { Scene } from '../system/Scene';
import { Text, TextStyle, Container } from 'pixi.js';
import { ScenesManager } from '../system/SceneManager';

export class Menu extends Scene {
  private options: { label: string; scene: string }[] = [
    { label: 'Ace of Shadows', scene: 'AceOfShadows' },
    { label: 'Phoenix Flame', scene: 'PhoenixFlame' }
  ];
  private container!: Container;

  init(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const lineHeight = 50;
    const totalHeight = this.options.length * lineHeight;
    const startY = height / 2 - totalHeight / 2;

    this.container = new Container();
    this.addChild(this.container);

    const style = new TextStyle({ fontSize: 32, fill: '#ffffff' });

    this.options.forEach((opt, i) => {
      const txt = new Text({ text: opt.label, style });
      txt.interactive = true;
      txt.x = width / 2 - txt.width / 2;
      txt.y = startY + i * lineHeight;
      txt.on('pointerover', () => {
        const newStyle = new TextStyle({ fontSize: 32, fill: '#000000' });
        txt.style = newStyle;
        window.document.body.style.cursor = 'pointer';
      });
      txt.on('pointerout', () => {
        const newStyle = new TextStyle({ fontSize: 32, fill: '#ffffff' });
        txt.style = newStyle;
        window.document.body.style.cursor = 'default';
      });
      txt.on('pointerdown', () => ScenesManager.start(opt.scene));
      this.container.addChild(txt);
    });
  }

  update(_delta: number): void {}
}