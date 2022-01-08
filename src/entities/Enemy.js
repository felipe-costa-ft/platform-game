import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy-standing-sheet", 0);

    const terrainCollider = scene.physics.add.collider(
      this,
      scene.map.getLayer("terrain").tilemapLayer
    );

    scene.physics.add.overlap(this, scene.colliderGroup, () => {
      if (this.body.velocity.x < 0) {
        this.setFlipX(true);
      } else {
        this.setFlipX(false);
      }
      this.body.setVelocityX(this.body.velocity.x * -1);
    });

    scene.add.existing(this);
    this.setOrigin(0, 1);
    scene.physics.add.existing(this);
    this.body.setVelocityX(-30);
    this.anims.play("enemy-running");
  }
}

export default Enemy;
