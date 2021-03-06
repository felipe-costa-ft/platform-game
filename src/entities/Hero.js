import Phaser from "phaser";
import StateMachine from "javascript-state-machine";

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hero-running-sheet", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(9, 13);
    this.body.setOffset(12, 18);
    this.body.setMaxVelocity(180, 400);
    this.body.setDragX(750);
    this.body.setCollideWorldBounds(true);

    this.anims.play("hero-running");

    this.keys = scene.cursorKeys;
    this.input = {};

    this.setupAnimations();
    this.setupMovement();

    this.hurted = false;

    scene.events.on("hurt", () => {
      this.hurted = true;
      setTimeout(() => (this.hurted = false), 1000);
    });
  }

  setupMovement() {
    this.moveState = new StateMachine({
      init: "standing",
      transitions: [
        { name: "jump", from: "standing", to: "jumping" },
        {
          name: "touchdown",
          from: ["jumping", "falling", "hurting"],
          to: "standing",
        },
        { name: "fall", from: "standing", to: "falling" },
        {
          name: "hurt",
          from: ["standing", "jumping", "falling"],
          to: "hurting",
        },
      ],
      methods: {
        onJump: () => {
          this.emit("jump");
          this.body.setVelocityY(-320);
        },
        onHurt: () => {
          this.body.setVelocityY(-270);
        },
      },
    });

    this.movePredicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      touchdown: () => {
        return this.body.onFloor() && !this.hurted;
      },
      fall: () => {
        return !this.body.onFloor() && !this.hurted;
      },
      hurt: () => {
        return this.hurted;
      },
    };
  }

  setupAnimations() {
    this.animState = new StateMachine({
      init: "idle",
      transitions: [
        { name: "idle", from: ["hurting", "falling", "running"], to: "idle" },
        { name: "run", from: ["idle", "falling"], to: "running" },
        { name: "jump", from: ["running", "idle"], to: "jumping" },
        { name: "fall", from: ["idle", "jumping", "running"], to: "falling" },
        {
          name: "hurt",
          from: ["idle", "jumping", "running", "falling"],
          to: "hurting",
        },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          this.anims.play("hero-" + lifecycle.to);
        },
      },
    });

    this.animsPredicates = {
      idle: () => {
        return (
          this.body.onFloor() && this.body.velocity.x === 0 && !this.hurted
        );
      },
      run: () => {
        return (
          this.body.onFloor() &&
          Math.sign(this.body.velocity.x) === (this.flipX ? -1 : 1)
        );
      },
      jump: () => {
        return this.body.velocity.y < 0 && !this.hurted;
      },
      fall: () => {
        return this.body.velocity.y > 0 && !this.hurted;
      },
      hurt: () => {
        return this.hurted;
      },
    };
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    if (this.keys.left.isDown && !this.hurted) {
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);
    } else if (this.keys.right.isDown && !this.hurted) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
    } else {
      this.body.setAccelerationX(0);
    }

    for (const t of this.animState.transitions()) {
      if (t in this.animsPredicates && this.animsPredicates[t]()) {
        this.animState[t]();
        break;
      }
    }

    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;
