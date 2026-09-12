import { describe, expect, it } from 'vitest';
import {
  centerCameraOnModule,
  clampCameraState,
  getInitialCameraState,
  panCameraState,
  setCameraZoom,
  stationMapWorld,
  stationMapZoom,
} from './station-map.js';

const mobileViewport = {
  width: 390,
  height: 480,
};

describe('station map camera bounds', () => {
  it('clamps camera scroll to the world edges', () => {
    expect(
      clampCameraState(
        {
          scrollX: -120,
          scrollY: 900,
          zoom: stationMapZoom.initial,
        },
        mobileViewport,
      ),
    ).toEqual({
      scrollX: 0,
      scrollY:
        stationMapWorld.height - mobileViewport.height / stationMapZoom.initial,
      zoom: stationMapZoom.initial,
    });
  });

  it('keeps panning inside the allowed bounds', () => {
    const initialState = getInitialCameraState(mobileViewport);
    const pannedState = panCameraState(
      initialState,
      mobileViewport,
      -1_200,
      -1_200,
    );

    expect(pannedState.scrollX).toBeCloseTo(
      stationMapWorld.width - mobileViewport.width / pannedState.zoom,
    );
    expect(pannedState.scrollY).toBeCloseTo(
      stationMapWorld.height - mobileViewport.height / pannedState.zoom,
    );
  });

  it('clamps pinch zoom between the documented minimum and maximum', () => {
    const initialState = getInitialCameraState(mobileViewport);

    expect(
      setCameraZoom(initialState, mobileViewport, 99, {
        x: mobileViewport.width / 2,
        y: mobileViewport.height / 2,
      }).zoom,
    ).toBe(stationMapZoom.max);

    expect(
      setCameraZoom(initialState, mobileViewport, 0.01, {
        x: mobileViewport.width / 2,
        y: mobileViewport.height / 2,
      }).zoom,
    ).toBe(stationMapZoom.min);
  });

  it('centers module focus requests without leaving camera bounds', () => {
    const focusedState = centerCameraOnModule(
      {
        scrollX: 0,
        scrollY: 0,
        zoom: stationMapZoom.initial,
      },
      mobileViewport,
      'dock',
    );

    expect(focusedState.scrollX).toBeGreaterThan(0);
    expect(focusedState.scrollX).toBeLessThanOrEqual(
      stationMapWorld.width - mobileViewport.width / focusedState.zoom,
    );
    expect(focusedState.scrollY).toBeGreaterThan(0);
    expect(focusedState.scrollY).toBeLessThanOrEqual(
      stationMapWorld.height - mobileViewport.height / focusedState.zoom,
    );
  });
});
