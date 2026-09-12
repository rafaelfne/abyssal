import Phaser from 'phaser';
import {
  centerCameraOnModule,
  getInitialCameraState,
  panCameraState,
  setCameraZoom,
  stationMapIntentEvent,
  stationMapSelectionEvent,
  stationMapSnapshotEvent,
  stationMapWorld,
  stationModules,
  stationPlatform,
  type StationMapIntent,
  type StationModuleSelectionIntent,
  type StationModuleId,
} from './station-map.js';

class StationPreviewScene extends Phaser.Scene {
  private static readonly dragThreshold = 10;
  private readonly parent: HTMLElement;
  private readonly moduleRings = new Map<
    StationModuleId,
    Phaser.GameObjects.Arc
  >();
  private selectedModuleId: StationModuleId | null = null;
  private lastDragPosition: { x: number; y: number } | null = null;
  private lastPinchDistance: number | null = null;
  private draggedSincePointerDown = false;
  private readonly handlePointerMove = (pointer: Phaser.Input.Pointer) => {
    const activePointers = this.input.manager.pointers.filter(
      (candidate) => candidate.isDown,
    );

    if (activePointers.length >= 2) {
      this.draggedSincePointerDown = true;
      const firstPointer = activePointers[0];
      const secondPointer = activePointers[1];

      if (!firstPointer || !secondPointer) {
        return;
      }

      const pinchDistance = Phaser.Math.Distance.Between(
        firstPointer.x,
        firstPointer.y,
        secondPointer.x,
        secondPointer.y,
      );
      const currentState = this.getCameraState();

      if (this.lastPinchDistance) {
        this.setCameraState(
          setCameraZoom(
            currentState,
            { width: this.scale.width, height: this.scale.height },
            (currentState.zoom * pinchDistance) / this.lastPinchDistance,
            {
              x: (firstPointer.x + secondPointer.x) / 2,
              y: (firstPointer.y + secondPointer.y) / 2,
            },
          ),
        );
      }

      this.lastPinchDistance = pinchDistance;
      this.lastDragPosition = null;
      return;
    }

    this.lastPinchDistance = null;

    if (!pointer.isDown) {
      this.lastDragPosition = null;
      return;
    }

    if (!this.lastDragPosition) {
      this.lastDragPosition = { x: pointer.x, y: pointer.y };
      return;
    }

    if (
      Phaser.Math.Distance.Between(
        pointer.x,
        pointer.y,
        this.lastDragPosition.x,
        this.lastDragPosition.y,
      ) > StationPreviewScene.dragThreshold
    ) {
      this.draggedSincePointerDown = true;
    }

    this.setCameraState(
      panCameraState(
        this.getCameraState(),
        { width: this.scale.width, height: this.scale.height },
        pointer.x - this.lastDragPosition.x,
        pointer.y - this.lastDragPosition.y,
      ),
    );
    this.lastDragPosition = { x: pointer.x, y: pointer.y };
  };
  private readonly handlePointerDown = () => {
    const activePointers = this.input.manager.pointers.filter(
      (candidate) => candidate.isDown,
    );

    if (activePointers.length === 1) {
      this.draggedSincePointerDown = false;
    }
  };
  private readonly handlePointerUp = () => {
    const activePointers = this.input.manager.pointers.filter(
      (candidate) => candidate.isDown,
    );

    if (activePointers.length === 0) {
      this.lastDragPosition = null;
      this.lastPinchDistance = null;
      this.draggedSincePointerDown = false;
      return;
    }

    this.lastDragPosition = null;
    if (activePointers.length < 2) {
      this.lastPinchDistance = null;
    }
  };

  constructor(parent: HTMLElement) {
    super('station-preview');
    this.parent = parent;
  }

  create() {
    const width = stationMapWorld.width;
    const height = stationMapWorld.height;
    const graphics = this.add.graphics();
    const camera = this.cameras.main;

    this.input.addPointer(2);
    camera.setBounds(0, 0, stationMapWorld.width, stationMapWorld.height);

    graphics.fillGradientStyle(0x0d6f7c, 0x0d6f7c, 0x03131a, 0x03131a, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.fillStyle(0x8de5dd, 0.16);
    graphics.fillEllipse(
      width * 0.5,
      height * 0.62,
      width * 0.9,
      height * 0.34,
    );
    graphics.fillStyle(0xffcf70, 1);
    graphics.fillRoundedRect(
      stationPlatform.x - stationPlatform.width / 2,
      stationPlatform.y - stationPlatform.height / 2,
      stationPlatform.width,
      stationPlatform.height,
      20,
    );
    graphics.fillStyle(0xd5f4ef, 1);
    graphics.fillCircle(stationPlatform.x, stationPlatform.y - 38, 42);
    graphics.fillStyle(0x0b2a34, 1);
    graphics.fillCircle(stationPlatform.x, stationPlatform.y - 38, 17);
    graphics.lineStyle(2, 0x8de5dd, 0.35);
    graphics.strokeCircle(stationPlatform.x, stationPlatform.y - 38, 58);
    graphics.strokeCircle(stationPlatform.x, stationPlatform.y - 38, 78);
    graphics.lineStyle(8, 0x144754, 0.85);

    for (const module of stationModules) {
      graphics.beginPath();
      graphics.moveTo(stationPlatform.x, stationPlatform.y + 12);
      graphics.lineTo(module.x, module.y);
      graphics.strokePath();
    }

    for (const module of stationModules) {
      const ring = this.add.circle(module.x, module.y, 24);
      ring.setStrokeStyle(4, 0xffffff, 0.2);
      ring.setAlpha(0);
      this.moduleRings.set(module.id, ring);

      const marker = this.add.circle(module.x, module.y, 16, module.color, 1);
      marker.setStrokeStyle(3, 0xe8fbf7, 0.72);
      marker.setInteractive();
      marker.on('pointerup', () => {
        if (this.draggedSincePointerDown) {
          return;
        }
        this.selectModule(module.id, 'map');
      });

      const label = this.add.text(module.x, module.y + 30, module.label, {
        align: 'center',
        color: '#e8fbf7',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '16px',
        fontStyle: '600',
      });
      label.setOrigin(0.5, 0);
    }

    const initialState = getInitialCameraState({
      width: this.scale.width,
      height: this.scale.height,
    });
    camera.setZoom(initialState.zoom);
    camera.setScroll(initialState.scrollX, initialState.scrollY);
    this.parent.dataset.mapReady = 'true';

    this.parent.addEventListener(stationMapIntentEvent, this.handleIntent);
    this.events.on('shutdown', () => {
      delete this.parent.dataset.mapReady;
      this.parent.removeEventListener(stationMapIntentEvent, this.handleIntent);
      this.input.off('pointermove', this.handlePointerMove);
      this.input.off('pointerdown', this.handlePointerDown);
      this.input.off('pointerup', this.handlePointerUp);
    });

    this.input.on('pointermove', this.handlePointerMove);
    this.input.on('pointerdown', this.handlePointerDown);
    this.input.on('pointerup', this.handlePointerUp);

    this.emitSnapshot();
  }

  private readonly handleIntent = (event: Event) => {
    const intent = (event as CustomEvent<StationMapIntent>).detail;
    const viewport = { width: this.scale.width, height: this.scale.height };
    const currentState = this.getCameraState();

    if (intent.type === 'module.select') {
      if (intent.source === 'controls') {
        this.setCameraState(
          centerCameraOnModule(currentState, viewport, intent.moduleId),
        );
      }
      this.selectModule(intent.moduleId, intent.source);
      return;
    }

    if (intent.type === 'camera.pan') {
      this.setCameraState(
        panCameraState(currentState, viewport, intent.deltaX, intent.deltaY),
      );
      return;
    }

    if (intent.type === 'camera.zoom') {
      this.setCameraState(
        setCameraZoom(currentState, viewport, intent.zoom, {
          x: viewport.width / 2,
          y: viewport.height / 2,
        }),
      );
      return;
    }

    this.setCameraState(getInitialCameraState(viewport));
  };

  private selectModule(
    moduleId: StationModuleId,
    source: StationModuleSelectionIntent['source'],
  ) {
    this.selectedModuleId = moduleId;

    for (const [candidateId, ring] of this.moduleRings) {
      ring.setAlpha(candidateId === moduleId ? 1 : 0);
      ring.setStrokeStyle(
        4,
        candidateId === moduleId ? 0xffcf70 : 0xffffff,
        candidateId === moduleId ? 0.9 : 0.2,
      );
    }

    this.parent.dispatchEvent(
      new CustomEvent<StationModuleSelectionIntent>(stationMapSelectionEvent, {
        detail: {
          type: 'module.select',
          moduleId,
          source,
        },
      }),
    );
    this.emitSnapshot();
  }

  private emitSnapshot() {
    this.parent.dispatchEvent(
      new CustomEvent(stationMapSnapshotEvent, {
        detail: {
          selectedModuleId: this.selectedModuleId,
          zoom: Number(this.cameras.main.zoom.toFixed(2)),
        },
      }),
    );
  }

  private getCameraState() {
    return {
      scrollX: this.cameras.main.scrollX,
      scrollY: this.cameras.main.scrollY,
      zoom: this.cameras.main.zoom,
    };
  }

  private setCameraState(state: {
    scrollX: number;
    scrollY: number;
    zoom: number;
  }) {
    this.cameras.main.setZoom(state.zoom);
    this.cameras.main.setScroll(state.scrollX, state.scrollY);
    this.emitSnapshot();
  }
}

export function createStationPreview(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: parent.clientWidth,
    height: parent.clientHeight,
    backgroundColor: '#03131a',
    scene: new StationPreviewScene(parent),
    render: { antialias: true, transparent: false },
  });
}
