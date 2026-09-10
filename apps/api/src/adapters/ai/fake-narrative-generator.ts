import {
  narrativeResultSchema,
  type NarrativeResult,
} from '@abyssal/contracts';
import type {
  NarrativeGenerator,
  NarrativeRequest,
} from '../../application/ports/narrative-generator.js';

export class FakeNarrativeGenerator implements NarrativeGenerator {
  generate(request: NarrativeRequest): Promise<NarrativeResult> {
    return Promise.resolve(
      narrativeResultSchema.parse({
        narrative: `The station recorded ${request.eventType}.`,
        memoryUpdates: [],
      }),
    );
  }
}
