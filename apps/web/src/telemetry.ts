import type { StationModuleId } from './game/station-map.js';

export type TelemetryEvent =
  | 'game_opened'
  | 'onboarding_started'
  | 'module_selected';

type TelemetryPayload = {
  event: TelemetryEvent;
  route: string;
  viewport: 'mobile' | 'desktop';
  platform: string;
  timestamp: string;
  moduleId?: StationModuleId;
  source?: 'map' | 'controls';
};

const emittedEvents = new Set<TelemetryEvent>([
  'game_opened',
  'onboarding_started',
]);

function getPayload(
  event: TelemetryEvent,
  detail?: Pick<TelemetryPayload, 'moduleId' | 'source'>,
): TelemetryPayload {
  return {
    event,
    route: window.location.pathname,
    viewport: window.innerWidth < 760 ? 'mobile' : 'desktop',
    platform: navigator.platform,
    timestamp: new Date().toISOString(),
    ...detail,
  };
}

export function emitTelemetry(
  event: TelemetryEvent,
  detail?: Pick<TelemetryPayload, 'moduleId' | 'source'>,
) {
  if (emittedEvents.has(event)) {
    return;
  }
  if (event !== 'module_selected') {
    emittedEvents.add(event);
  }
  try {
    window.dispatchEvent(
      new CustomEvent<TelemetryPayload>('abyssal:telemetry', {
        detail: getPayload(event, detail),
      }),
    );
  } catch {
    if (event !== 'module_selected') {
      emittedEvents.delete(event);
    }
  }
}
