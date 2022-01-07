import Phaser from "phaser";
import Hero from "../entities/Hero";
import Coin from "../entities/Coin";

class Game extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.tilemapTiledJSON("level-1", "assets/tilemaps/level-1.json");

    this.load.spritesheet("terrain-1-sheet", "assets/tilesets/terrain-1.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet(
      "entities-1-sheet",
      "assets/tilesets/entities-1.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );

    this.load.spritesheet(
      "background-1-sheet",
      "assets/tilesets/background.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );

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

    this.load.spritesheet("coin-sheet", "assets/pick-ups/coin.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio("grasslands", ["assets/music/grasslands.mp3"]);

    this.load.audio("jump", "assets/sound-effects/jump.wav");
    this.load.audio("pickup_coin", "assets/sound-effects/pickup_coin.wav");
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

    this.anims.create({
      key: "coin",
      frames: this.anims.generateFrameNumbers("coin-sheet"),
      frameRate: 4,
      repeat: -1,
    });

    this.jumpSound = this.sound.add("jump", { loop: false });
    this.pickupCoinSound = this.sound.add("pickup_coin", { loop: false });

    this.sceneMusic = this.sound.add("grasslands", { loop: true });
    this.sceneMusic.play();

    this.addMap();
    this.addHero();
    this.addCoin();

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  addCoin() {
    this.coinGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.map.getObjectLayer("coins").objects.forEach((coin) => {
      new Coin(this, coin.x, coin.y, this.pickupCoinSound);
    });
  }

  addHero() {
    this.hero = new Hero(this, 250, 30);
    this.cameras.main.startFollow(this.hero);

    const terrainCollider = this.physics.add.collider(
      this.hero,
      this.map.getLayer("terrain").tilemapLayer
    );

    this.hero.on("jump", () => {
      this.jumpSound.play();
    });
  }

  addMap() {
    this.map = this.make.tilemap({ key: "level-1" });
    const terrainTiles = this.map.addTilesetImage(
      "terrain-1",
      "terrain-1-sheet"
    );
    const entitiesTiles = this.map.addTilesetImage(
      "entities-1",
      "entities-1-sheet"
    );

    const backgroundTiles = this.map.addTilesetImage(
      "background",
      "background-1-sheet"
    );

    const backgroundLayer = this.map.createStaticLayer(
      "background",
      backgroundTiles
    );
    const terrainLayer = this.map.createStaticLayer("terrain", terrainTiles);
    const entitiesLayer = this.map.createStaticLayer(
      "entities-1",
      entitiesTiles
    );

    backgroundLayer.setScrollFactor(0.6);

    terrainLayer.setCollision(
      [
        21, 22, 23, 38, 39, 40, 53, 54, 55, 56, 57, 58, 59, 70, 71, 72, 73, 74,
        75, 76, 89, 90, 91, 106, 107, 108, 140, 29, 46, 61, 62, 63, 64, 65, 80,
        97, 67,
      ],
      true
    );

    this.physics.world.setBoundsCollision(true, true, false, true);
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  update(time, delta) {
    const cameraBotton = this.cameras.main.getWorldPoint(
      0,
      this.cameras.main.height
    ).y;
  }
}

export default Game;
