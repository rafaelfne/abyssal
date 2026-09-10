import type { PgBoss } from 'pg-boss';
import type { NarrativeJobQueue } from '../../application/ports/narrative-job-queue.js';
import type { NarrativeRequest } from '../../application/ports/narrative-generator.js';

export class PgBossNarrativeJobQueue implements NarrativeJobQueue {
  constructor(private readonly boss: PgBoss) {}

  async enqueue(request: NarrativeRequest): Promise<string> {
    const jobId = await this.boss.send('narrative.generate', request, {
      singletonKey: request.requestId,
    });
    if (!jobId) {
      throw new Error('Narrative job was not accepted');
    }
    return jobId;
  }
}
