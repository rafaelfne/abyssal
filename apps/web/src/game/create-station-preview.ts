import Phaser from 'phaser';

class StationPreviewScene extends Phaser.Scene {
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const graphics = this.add.graphics();

    graphics.fillGradientStyle(0x0d6f7c, 0x0d6f7c, 0x03131a, 0x03131a, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.fillStyle(0x8de5dd, 0.16);
    graphics.fillEllipse(
      width * 0.5,
      height * 0.52,
      width * 0.8,
      height * 0.28,
    );
    graphics.fillStyle(0xffcf70, 1);
    graphics.fillRoundedRect(width * 0.18, height * 0.39, width * 0.64, 24, 8);
    graphics.fillStyle(0xd5f4ef, 1);
    graphics.fillCircle(width * 0.5, height * 0.35, 42);
    graphics.fillStyle(0x0b2a34, 1);
    graphics.fillCircle(width * 0.5, height * 0.35, 17);
    graphics.lineStyle(2, 0x8de5dd, 0.35);
    graphics.strokeCircle(width * 0.5, height * 0.35, 58);
    graphics.strokeCircle(width * 0.5, height * 0.35, 78);
  }
}

export function createStationPreview(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: parent.clientWidth,
    height: parent.clientHeight,
    backgroundColor: '#03131a',
    scene: StationPreviewScene,
    render: { antialias: true, transparent: false },
  });
}
