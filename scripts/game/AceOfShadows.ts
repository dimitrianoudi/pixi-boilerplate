import { Scene } from '../system/Scene';
import { Sprite, Texture, Text, TextStyle, Container } from 'pixi.js';
import { ScenesManager } from '../system/SceneManager';

interface Animation {
  sprite: Sprite;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  elapsed: number;
  duration: number;
}

export class AceOfShadows extends Scene {
  private cards: Sprite[] = [];
  private animations: Animation[] = [];
  private frameCounter = 0;
  private stacks: { x: number; y: number; count: number }[] = [];

  init(): void {

    const backStyle = new TextStyle({ 
      fontSize: 18, 
      fill: '#000000',
      fontWeight: 'normal'
    });
    const backText = new Text({ text: '← Menu', style: backStyle });
    backText.interactive = true;
    backText.cursor = 'pointer';
    
    const buttonContainer = new Container();
    buttonContainer.width = backText.width + 16;
    buttonContainer.height = backText.height + 8;
    buttonContainer.x = window.innerWidth - buttonContainer.width - 20;
    buttonContainer.y = 20;
    buttonContainer.interactive = true;
    buttonContainer.cursor = 'pointer';
    
    buttonContainer.addChild(backText);
    backText.x = -60;
    backText.y = 60;
    
    buttonContainer.on('pointerover', () => {
      const newStyle = new TextStyle({ 
        fontSize: 18, 
        fill: '#ffffff',
        fontWeight: 'normal'
      });
      backText.style = newStyle;
      window.document.body.style.cursor = 'pointer';
    });
    buttonContainer.on('pointerout', () => {
      const newStyle = new TextStyle({ 
        fontSize: 18, 
        fill: '#000000',
        fontWeight: 'normal'
      });
      backText.style = newStyle;
      window.document.body.style.cursor = 'default';
    });
    
    buttonContainer.on('pointerdown', () => {
      console.log('Back button clicked!');
      ScenesManager.start('Menu');
    });
    
    this.addChild(buttonContainer);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const numStacks = 2;
    const spacing = width / (numStacks + 1);
    for (let i = 0; i < numStacks; i++) {
      this.stacks.push({ x: spacing * (i + 1), y: height / 2, count: 0 });
    }

    // Creates 144 card sprites in a single stack
    const texture = Texture.from('card.png');
    console.log('Texture:', texture);
    
    if (!texture) {
      console.warn('card.png texture not found. Please add card.png to /sprites');
      return;
    }
    
    const totalCards = 144;
    for (let i = 0; i < totalCards; i++) {
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      const offset = this.stacks[0].count * 0.3;
      sprite.x = this.stacks[0].x + offset;
      sprite.y = this.stacks[0].y + offset;
      (sprite as any).stackIndex = 0;
      this.stacks[0].count++;
      this.addChild(sprite);
      this.cards.push(sprite);
    }
  }

  update(delta: number): void {
    this.animations = this.animations.filter(anim => {
      anim.elapsed += delta;
      const t = Math.min(anim.elapsed / anim.duration, 1);
      anim.sprite.x = anim.startX + (anim.targetX - anim.startX) * t;
      anim.sprite.y = anim.startY + (anim.targetY - anim.startY) * t;
      if (t >= 1) {
        const oldIdx = (anim.sprite as any).stackIndex;
        if (this.stacks[oldIdx]) {
          this.stacks[oldIdx].count--;
        }
        const newIdx = (anim.sprite as any).stackIndex = this.getStackIndexByPosition(anim.targetX, anim.targetY);
        if (this.stacks[newIdx]) {
          this.stacks[newIdx].count++;
        }
        this.removeChild(anim.sprite);
        this.addChild(anim.sprite);
        return false;
      }
      return true;
    });

    // Moves the top card every 60 frames (1 second at 60fps)
    this.frameCounter += delta;
    if (this.frameCounter >= 60) {
      this.frameCounter -= 60;
      const sprite = this.cards.pop();
      if (sprite) {
        const currentIdx = (sprite as any).stackIndex;
        let nextIdx = currentIdx;
        while (nextIdx === currentIdx) {
          nextIdx = Math.floor(Math.random() * this.stacks.length);
        }
        const stack = this.stacks[nextIdx];
        const startX = sprite.x;
        const startY = sprite.y;
        const offset = stack.count * 0.1;
        const targetX = stack.x + offset;
        const targetY = stack.y + offset;
        this.animations.push({ sprite, startX, startY, targetX, targetY, elapsed: 0, duration: 120 });
        this.cards.unshift(sprite);
      }
    }
  }

  private getStackIndexByPosition(x: number, y: number): number {
    return this.stacks.findIndex(s => Math.abs(s.x - x) < 1 && Math.abs(s.y - y) < 1) || 0;
  }
}