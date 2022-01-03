import Phaser from "phaser";

class Coin extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sound) {
    super(scene, x, y, "coin-sheet", 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 1);

    this.body.immovable = true;
    this.body.allowGravity = false;
    this.anims.play("coin");

    scene.physics.add.overlap(scene.hero, this, () => {
      this.get();
      sound.play();
    });
  }

  get() {
    this.destroy();
  }
}

export default Coin;
