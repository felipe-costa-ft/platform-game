import Phaser from "phaser";

class GUI extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene", active: true });

    this.coins = 0;
  }

  preload() {
    this.load.bitmapFont(
      "gui-font",
      "assets/GUI/gui-font.png",
      "assets/GUI/gui-font.xml"
    );
  }

  create() {
    let coinsCounter = this.add.bitmapText(3, 3, "gui-font", "c:0");

    //  Grab a reference to the Game Scene
    let ourGame = this.scene.get("GameScene");

    //  Listen for events from it
    ourGame.events.on(
      "addScore",
      function () {
        console.log("emit");
        this.coins += 1;

        coinsCounter.setText("c:" + this.coins);
      },
      this
    );
  }
}

export default GUI;
