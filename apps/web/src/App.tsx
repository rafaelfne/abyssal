import type { Game } from 'phaser';
import { useEffect, useRef } from 'react';

const systems = [
  { label: 'Power', value: 'Stable' },
  { label: 'Oxygen', value: 'Stable' },
  { label: 'Crew', value: '3 aboard' },
];

export function App() {
  const mapHost = useRef<HTMLDivElement>(null);

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

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Pelagos Research Authority</p>
          <h1>Abyssal Colony Manager</h1>
        </div>
        <span className="signal" aria-label="Station link online" />
      </header>

      <section className="status-strip" aria-label="Station systems">
        {systems.map((system) => (
          <div className="status-item" key={system.label}>
            <span>{system.label}</span>
            <strong>{system.value}</strong>
          </div>
        ))}
      </section>

      <section className="map-panel" aria-label="Station preview">
        <div className="map-copy">
          <p className="eyebrow">Expedition 001</p>
          <h2>Foundation online</h2>
          <p>The station awaits its first operational cycle.</p>
        </div>
        <div className="map-host" ref={mapHost} />
      </section>

      <section className="foundation-card">
        <span>Current phase</span>
        <strong>Systems commissioning</strong>
        <p>Gameplay begins with the first ready product issue.</p>
      </section>
    </main>
  );
}
