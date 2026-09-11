export type TelemetryEvent = 'game_opened' | 'onboarding_started';

type TelemetryPayload = {
  event: TelemetryEvent;
  route: string;
  viewport: 'mobile' | 'desktop';
  platform: string;
  timestamp: string;
};

const emittedEvents = new Set<TelemetryEvent>();

function getPayload(event: TelemetryEvent): TelemetryPayload {
  return {
    event,
    route: window.location.pathname,
    viewport: window.innerWidth < 760 ? 'mobile' : 'desktop',
    platform: navigator.platform,
    timestamp: new Date().toISOString(),
  };
}

export function emitTelemetry(event: TelemetryEvent) {
  if (emittedEvents.has(event)) {
    return;
  }
  emittedEvents.add(event);
  try {
    window.dispatchEvent(
      new CustomEvent<TelemetryPayload>('abyssal:telemetry', {
        detail: getPayload(event),
      }),
    );
  } catch {
    emittedEvents.delete(event);
  }
}
