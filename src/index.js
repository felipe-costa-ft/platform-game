import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import GUI from "./scenes/GUI";

new Phaser.Game(Object.assign(config, { scene: [GameScene, GUI] }));
