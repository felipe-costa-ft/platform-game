import Phaser from "phaser";
import Hero from "../entities/Hero";

class Game extends Phaser.Scene {
  preload() {
    this.load.spritesheet("hero-idle-sheet", "assets/hero/idle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("hero-running-sheet", "assets/hero/running.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("hero-jumping-sheet", "assets/hero/jump.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("hero-falling-sheet", "assets/hero/fall.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-running-sheet"),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jumping-sheet"),
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-falling-sheet"),
    });

    this.hero = new Hero(this, 250, 160);
  }

  update(time, delta) {}
}

export default Game;
