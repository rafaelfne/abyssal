import { z } from 'zod';

export const narrativeMemoryUpdateSchema = z.object({
  crewId: z.string().min(1),
  memory: z.string().min(1).max(240),
});

export const narrativeResultSchema = z.object({
  narrative: z.string().min(1).max(600),
  memoryUpdates: z.array(narrativeMemoryUpdateSchema).max(3),
});

export type NarrativeResult = z.infer<typeof narrativeResultSchema>;
