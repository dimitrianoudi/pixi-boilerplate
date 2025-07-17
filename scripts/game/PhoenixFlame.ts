import { Scene } from '../system/Scene';
import { Sprite, Texture, Text, TextStyle, Container } from 'pixi.js';
import { ScenesManager } from '../system/SceneManager';

interface Particle {
  sprite: Sprite;
  vx: number;
  vy: number;
  life: number;
  decay: number;
}

export class PhoenixFlame extends Scene {
  private particles: Particle[] = [];
  private texture!: Texture;

  init(): void {
    this.texture = Texture.from('flame.png');

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
      ScenesManager.start('Menu');
    });
    
    this.addChild(buttonContainer);
  }

  update(delta: number): void {
    if (this.particles.length < 10) {
      this.spawnParticle();
    }

    this.particles = this.particles.filter(p => {
      p.life -= delta;
      p.sprite.x += p.vx * delta;
      p.sprite.y += p.vy * delta;
      p.sprite.alpha = Math.max(p.life / 60, 0);
      p.sprite.scale.x = p.sprite.scale.y = 1 + (1 - p.sprite.alpha);
      if (p.life <= 0) {
        this.removeChild(p.sprite);
        return false;
      }
      return true;
    });
  }

  private spawnParticle(): void {
    const sprite = new Sprite(this.texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = window.innerWidth / 2;
    sprite.y = window.innerHeight;
    const angle = (Math.random() * Math.PI / 2) + Math.PI / 4;
    const speed = 2 + Math.random() * 2;
    const vx = Math.cos(angle) * speed;
    const vy = -Math.sin(angle) * speed;
    const life = 60 + Math.random() * 30;
    const decay = 1 / life;
    sprite.alpha = 1;
    this.addChild(sprite);
    this.particles.push({ sprite, vx, vy, life, decay });
  }
}