import Phaser from "phaser";

class Collider extends Phaser.GameObjects.Zone {
  constructor(scene, x, y) {
    super(scene, x, y, 16, 16);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0, 0);
  }
}

export default Collider;
