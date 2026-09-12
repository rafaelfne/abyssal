export const stationMapWorld = {
  width: 680,
  height: 640,
} as const;

export const stationMapZoom = {
  initial: 1.05,
  min: 0.85,
  max: 2.4,
  step: 0.2,
} as const;

export const stationPlatform = {
  x: stationMapWorld.width / 2,
  y: 148,
  width: 380,
  height: 72,
} as const;

export const stationModules = [
  {
    id: 'habitation',
    label: 'Habitation module',
    detail: 'Crew rest, morale recovery and sleeping quarters.',
    x: 166,
    y: 260,
    color: 0x8de5dd,
  },
  {
    id: 'cultivator',
    label: 'Hydroponic cultivator',
    detail: 'Food production for the first expedition cycle.',
    x: 336,
    y: 240,
    color: 0x7ee081,
  },
  {
    id: 'generator',
    label: 'Tidal generator',
    detail: 'Primary power generation above the alien ocean.',
    x: 514,
    y: 260,
    color: 0xffcf70,
  },
  {
    id: 'purifier',
    label: 'Water and air purifier',
    detail: 'Oxygen stability and life-support filtration.',
    x: 188,
    y: 412,
    color: 0xa9b6ff,
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    detail: 'Analysis, discoveries and expedition research.',
    x: 348,
    y: 438,
    color: 0xd99dff,
  },
  {
    id: 'dock',
    label: 'Submersible dock',
    detail: 'Launch point for deeper exploration and recovery.',
    x: 498,
    y: 402,
    color: 0xff8f8f,
  },
] as const;

export type StationModuleId = (typeof stationModules)[number]['id'];

export type StationModuleSelectionIntent = {
  type: 'module.select';
  moduleId: StationModuleId;
  source: 'map' | 'controls';
};

export type StationMapIntent =
  | StationModuleSelectionIntent
  | {
      type: 'camera.pan';
      deltaX: number;
      deltaY: number;
      source: 'controls';
    }
  | {
      type: 'camera.zoom';
      zoom: number;
      source: 'controls';
    }
  | {
      type: 'camera.reset';
      source: 'controls';
    };

export type StationMapSnapshot = {
  selectedModuleId: StationModuleId | null;
  zoom: number;
};

export type CameraState = {
  scrollX: number;
  scrollY: number;
  zoom: number;
};

type Viewport = {
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

export const stationMapIntentEvent = 'abyssal:station-map-intent';
export const stationMapSelectionEvent = 'abyssal:station-map-selection';
export const stationMapSnapshotEvent = 'abyssal:station-map-snapshot';

const stationModuleById = new Map(
  stationModules.map((module) => [module.id, module]),
);

export function getStationModule(moduleId: StationModuleId) {
  const module = stationModuleById.get(moduleId);
  if (!module) {
    throw new Error(`Unknown station module: ${moduleId}`);
  }
  return module;
}

export function dispatchStationMapIntent(
  host: HTMLElement,
  intent: StationMapIntent,
) {
  host.dispatchEvent(
    new CustomEvent<StationMapIntent>(stationMapIntentEvent, {
      detail: intent,
    }),
  );
}

export function clampCameraState(
  state: CameraState,
  viewport: Viewport,
): CameraState {
  const zoom = clampZoom(state.zoom);
  const maxScrollX = Math.max(0, stationMapWorld.width - viewport.width / zoom);
  const maxScrollY = Math.max(
    0,
    stationMapWorld.height - viewport.height / zoom,
  );

  return {
    zoom,
    scrollX: clamp(state.scrollX, 0, maxScrollX),
    scrollY: clamp(state.scrollY, 0, maxScrollY),
  };
}

export function panCameraState(
  state: CameraState,
  viewport: Viewport,
  deltaX: number,
  deltaY: number,
) {
  return clampCameraState(
    {
      zoom: state.zoom,
      scrollX: state.scrollX - deltaX / state.zoom,
      scrollY: state.scrollY - deltaY / state.zoom,
    },
    viewport,
  );
}

export function setCameraZoom(
  state: CameraState,
  viewport: Viewport,
  zoom: number,
  focus: Point,
) {
  const nextZoom = clampZoom(zoom);
  const focusWorldX = state.scrollX + focus.x / state.zoom;
  const focusWorldY = state.scrollY + focus.y / state.zoom;

  return clampCameraState(
    {
      zoom: nextZoom,
      scrollX: focusWorldX - focus.x / nextZoom,
      scrollY: focusWorldY - focus.y / nextZoom,
    },
    viewport,
  );
}

export function centerCameraOnModule(
  state: CameraState,
  viewport: Viewport,
  moduleId: StationModuleId,
) {
  const module = getStationModule(moduleId);

  return clampCameraState(
    {
      zoom: state.zoom,
      scrollX: module.x - viewport.width / (2 * state.zoom),
      scrollY: module.y - viewport.height / (2 * state.zoom),
    },
    viewport,
  );
}

export function getInitialCameraState(viewport: Viewport): CameraState {
  return clampCameraState(
    {
      scrollX:
        stationPlatform.x - viewport.width / (2 * stationMapZoom.initial),
      scrollY:
        stationPlatform.y - viewport.height / (2 * stationMapZoom.initial),
      zoom: stationMapZoom.initial,
    },
    viewport,
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function clampZoom(zoom: number) {
  return clamp(zoom, stationMapZoom.min, stationMapZoom.max);
}
