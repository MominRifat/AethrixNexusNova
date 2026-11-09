import { z } from "zod";

/**
 * Zod Schemas for Runtime Validation
 */
export const ArchitectureLayerSchema = z.object({
  name: z.string().min(1),
  components: z.array(z.string().min(1)).min(1),
});

export const ArchitectureMilestoneSchema = z.object({
  title: z.string().min(1),
  weeks: z.string().min(1),
});

export const ArchitecturePlanSchema = z.object({
  summary: z.string().min(10),
  layers: z.array(ArchitectureLayerSchema).min(3),
  stack: z.array(z.string().min(1)).min(3),
  milestones: z.array(ArchitectureMilestoneSchema).min(3),
  assumptions: z.array(z.string().min(1)).min(1),
});

/**
 * TypeScript Interfaces derived from Schemas
 */
export type ArchitectureLayer = z.infer<typeof ArchitectureLayerSchema>;
export type ArchitectureMilestone = z.infer<typeof ArchitectureMilestoneSchema>;
export type ArchitecturePlan = z.infer<typeof ArchitecturePlanSchema>;

export interface ArchitectureResponse {
  plan: ArchitecturePlan;
  provider: "live" | "demo";
  error?: string;
}
