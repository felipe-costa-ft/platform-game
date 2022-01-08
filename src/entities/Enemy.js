import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy-standing-sheet", 0);

    const terrainCollider = scene.physics.add.collider(
      this,
      scene.map.getLayer("terrain").tilemapLayer
    );

    scene.add.existing(this);
    this.setOrigin(0, 1);
    scene.physics.add.existing(this);
  }
}

export default Enemy;
