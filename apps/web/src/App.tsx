import type { Game } from 'phaser';
import { useEffect, useRef, useState } from 'react';
import {
  dispatchStationMapIntent,
  getStationModule,
  stationMapSelectionEvent,
  stationMapSnapshotEvent,
  stationMapZoom,
  stationModules,
  type StationMapIntent,
  type StationMapSnapshot,
  type StationModuleId,
  type StationModuleSelectionIntent,
} from './game/station-map.js';
import { emitTelemetry } from './telemetry.js';

type Route =
  | { name: 'intro' }
  | { name: 'expedition' }
  | { name: 'crew'; crewId: string }
  | { name: 'report' };

const systems = [
  { label: 'Power', value: 'Stable' },
  { label: 'Oxygen', value: 'Stable' },
  { label: 'Crew', value: '3 aboard' },
];

function parseRoute(pathname: string): Route {
  if (pathname === '/expedition') {
    return { name: 'expedition' };
  }
  if (pathname === '/report') {
    return { name: 'report' };
  }
  const crewMatch = pathname.match(/^\/crew\/([^/]+)$/);
  const crewId = crewMatch?.[1];
  if (crewId) {
    return { name: 'crew', crewId: decodeURIComponent(crewId) };
  }
  return { name: 'intro' };
}

function useRoute() {
  const [route, setRoute] = useState<Route>(() =>
    parseRoute(window.location.pathname),
  );

  useEffect(() => {
    if (route.name === 'intro' && window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/');
    }
    const handlePopState = () => {
      const nextRoute = parseRoute(window.location.pathname);
      if (nextRoute.name === 'intro' && window.location.pathname !== '/') {
        window.history.replaceState({}, '', '/');
      }
      setRoute(nextRoute);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return route;
}

function RouteLink({
  children,
  pathname,
  onNavigate,
}: {
  children: React.ReactNode;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <a href={pathname} onClick={() => onNavigate?.()}>
      {children}
    </a>
  );
}

function Introduction() {
  return (
    <section className="route-card">
      <p className="eyebrow">First contact</p>
      <h2>Keep the station alive.</h2>
      <p>
        Meet the crew, set a priority and guide a research station above an
        alien ocean.
      </p>
      <RouteLink
        pathname="/expedition"
        onNavigate={() => emitTelemetry('onboarding_started')}
      >
        Start expedition
      </RouteLink>
    </section>
  );
}

function StationPreview() {
  const mapHost = useRef<HTMLDivElement>(null);
  const [selectedModuleId, setSelectedModuleId] =
    useState<StationModuleId | null>(null);
  const [zoom, setZoom] = useState<number>(stationMapZoom.initial);

  useEffect(() => {
    if (!mapHost.current) {
      return;
    }
    const host = mapHost.current;
    let game: Game | undefined;
    let disposed = false;
    void import('./game/create-station-preview.js').then(
      ({ createStationPreview }) => {
        if (!disposed) {
          game = createStationPreview(host);
        }
      },
    );
    return () => {
      disposed = true;
      game?.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (!mapHost.current) {
      return;
    }
    const host = mapHost.current;

    const handleSelection = (event: Event) => {
      const intent = (event as CustomEvent<StationModuleSelectionIntent>)
        .detail;
      setSelectedModuleId(intent.moduleId);
      emitTelemetry('module_selected', {
        moduleId: intent.moduleId,
        source: intent.source,
      });
    };

    const handleSnapshot = (event: Event) => {
      const snapshot = (event as CustomEvent<StationMapSnapshot>).detail;
      setZoom(snapshot.zoom);
    };

    host.addEventListener(stationMapSelectionEvent, handleSelection);
    host.addEventListener(stationMapSnapshotEvent, handleSnapshot);

    return () => {
      host.removeEventListener(stationMapSelectionEvent, handleSelection);
      host.removeEventListener(stationMapSnapshotEvent, handleSnapshot);
    };
  }, []);

  const selectedModule = selectedModuleId
    ? getStationModule(selectedModuleId)
    : null;

  const sendIntent = (intent: StationMapIntent) => {
    if (!mapHost.current) {
      return;
    }
    dispatchStationMapIntent(mapHost.current, intent);
  };

  return (
    <section className="map-panel" aria-label="Station map and controls">
      <div className="map-stage">
        <div className="map-copy">
          <p className="eyebrow">Expedition 001</p>
          <h2>Foundation online</h2>
          <p>The station awaits its first operational cycle.</p>
        </div>
        <div className="map-host" ref={mapHost} />
      </div>
      <div className="map-controls">
        <div
          aria-label="Station map camera controls"
          className="map-toolbar"
          role="group"
        >
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.pan',
                deltaX: 0,
                deltaY: 72,
                source: 'controls',
              })
            }
          >
            Pan down
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.pan',
                deltaX: -72,
                deltaY: 0,
                source: 'controls',
              })
            }
          >
            Pan left
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.pan',
                deltaX: 72,
                deltaY: 0,
                source: 'controls',
              })
            }
          >
            Pan right
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.pan',
                deltaX: 0,
                deltaY: -72,
                source: 'controls',
              })
            }
          >
            Pan up
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.zoom',
                zoom: zoom + stationMapZoom.step,
                source: 'controls',
              })
            }
          >
            Zoom in
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({
                type: 'camera.zoom',
                zoom: zoom - stationMapZoom.step,
                source: 'controls',
              })
            }
          >
            Zoom out
          </button>
          <button
            type="button"
            onClick={() =>
              sendIntent({ type: 'camera.reset', source: 'controls' })
            }
          >
            Reset view
          </button>
        </div>
        <div
          aria-label="Station module selection"
          className="module-grid"
          role="group"
        >
          {stationModules.map((module) => (
            <button
              aria-pressed={selectedModuleId === module.id}
              key={module.id}
              type="button"
              data-selected={selectedModuleId === module.id}
              onClick={() =>
                sendIntent({
                  type: 'module.select',
                  moduleId: module.id,
                  source: 'controls',
                })
              }
            >
              {module.label}
            </button>
          ))}
        </div>
        <div className="map-status" aria-live="polite">
          <strong>{selectedModule?.label ?? 'Select a module'}</strong>
          <p>
            {selectedModule?.detail ??
              'Use the map or the buttons below to inspect a module.'}
          </p>
          <span>Zoom {Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </section>
  );
}

function Expedition() {
  return (
    <>
      <section className="status-strip" aria-label="Station systems">
        {systems.map((system) => (
          <div className="status-item" key={system.label}>
            <span>{system.label}</span>
            <strong>{system.value}</strong>
          </div>
        ))}
      </section>
      <StationPreview />
      <section className="foundation-card">
        <span>Current phase</span>
        <strong>Systems commissioning</strong>
        <p>Gameplay begins with the first ready product issue.</p>
      </section>
    </>
  );
}

function CrewDetails({ crewId }: { crewId: string }) {
  return (
    <section className="route-card">
      <p className="eyebrow">Crew file</p>
      <h2>Crew member {crewId}</h2>
      <p>Crew details will be available when the first expedition is ready.</p>
      <button type="button" onClick={() => window.history.back()}>
        Back to previous screen
      </button>
    </section>
  );
}

function Report() {
  return (
    <section className="route-card">
      <p className="eyebrow">Expedition report</p>
      <h2>Your report is waiting.</h2>
      <p>Complete an expedition to review resources, morale and discoveries.</p>
      <RouteLink pathname="/">Return to introduction</RouteLink>
    </section>
  );
}

export function App() {
  const route = useRoute();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    emitTelemetry('game_opened');
    headingRef.current?.focus();
  }, [route]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Pelagos Research Authority</p>
          <h1>Abyssal Colony Manager</h1>
        </div>
        <span className="signal" aria-label="Station link online" />
      </header>

      <p className="connection-status" role="status">
        {navigator.onLine
          ? 'Connection ready'
          : 'Connection required to continue'}
      </p>

      <h2 className="route-heading" ref={headingRef} tabIndex={-1}>
        {route.name === 'intro'
          ? 'Introduction'
          : route.name === 'expedition'
            ? 'Expedition'
            : route.name === 'crew'
              ? 'Crew details'
              : 'Report'}
      </h2>

      <div className="route-content">
        {route.name === 'intro' && <Introduction />}
        {route.name === 'expedition' && <Expedition />}
        {route.name === 'crew' && <CrewDetails crewId={route.crewId} />}
        {route.name === 'report' && <Report />}
      </div>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <RouteLink pathname="/">Intro</RouteLink>
        <RouteLink pathname="/expedition">Expedition</RouteLink>
        <RouteLink pathname="/crew/explorer">Crew</RouteLink>
        <RouteLink pathname="/report">Report</RouteLink>
      </nav>
    </main>
  );
}
