/**
 * Content Collections Configuration
 * * Defines the core content collections for Brody Kester's portfolio.
 * * Collections:
 * - projects: Case studies with structured narrative format
 * - journey: Career and education timeline entries
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects (Case Studies) Collection
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.number(),
    duration: z.string().optional(),
    teamSize: z.number().optional(),
    outcomeSummary: z.string(),
    overview: z.string(),
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      alternatives: z.array(z.string()).optional(),
    })),
    techStack: z.array(z.string()),
    impact: z.object({
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      qualitative: z.string(),
    }),
    learnings: z.array(z.string()),
    featured: z.boolean().default(false),
    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
    order: z.number().optional(),
    relatedProjects: z.array(z.string()).optional(),
  }),
});

/**
 * Journey Timeline Collection
 */
const journeyCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journey' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    type: z.enum(['milestone', 'learning', 'transition']),
    description: z.string(),
    skills: z.array(z.string()).optional(),
  }),
});

/**
 * Export active collections
 */
export const collections = {
  projects: projectsCollection,
  journey: journeyCollection,
};