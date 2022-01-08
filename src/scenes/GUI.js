import Phaser from "phaser";

class GUI extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene", active: true });

    this.coins = 0;
    this.lifes = 3;
  }

  preload() {
    this.load.bitmapFont(
      "gui-font",
      "assets/GUI/gui-font.png",
      "assets/GUI/gui-font.xml"
    );

    this.load.spritesheet(
      "health-indicator",
      "assets/GUI/health-indicator.png",
      {
        frameWidth: 8,
        frameHeight: 8,
      }
    );
  }

  create() {
    const heart1 = this.add.sprite(6, 6, "health-indicator", 0);
    const heart2 = this.add.sprite(15, 6, "health-indicator", 0);
    const heart3 = this.add.sprite(24, 6, "health-indicator", 0);

    this.healthIndicator = [heart1, heart2, heart3];

    let coinsCounter = this.add.bitmapText(43, 3, "gui-font", "c:0");
    //  Grab a reference to the Game Scene
    let ourGame = this.scene.get("GameScene");

    //  Listen for events from it
    ourGame.events.on(
      "addScore",
      function () {
        this.coins += 1;

        coinsCounter.setText("c:" + this.coins);
      },
      this
    );

    ourGame.events.on(
      "hurt",
      function () {
        this.lifes -= 1;

        if (this.lifes >= 0) this.healthIndicator[this.lifes].setFrame(1);
      },
      this
    );
  }

  update(time, delta) {}
}

export default GUI;
