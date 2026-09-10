import type { NarrativeResult } from '@abyssal/contracts';

export type NarrativeRequest = {
  eventType: string;
  facts: readonly string[];
  requestId: string;
};

export interface NarrativeGenerator {
  generate(request: NarrativeRequest): Promise<NarrativeResult>;
}
