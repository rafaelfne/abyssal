import type { NarrativeRequest } from './narrative-generator.js';

export interface NarrativeJobQueue {
  enqueue(request: NarrativeRequest): Promise<string>;
}
