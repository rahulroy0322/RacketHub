import { z } from 'zod'

const matchStatus = <const>['scheduled', 'live', 'completed']

const commentSchema = z.object({
	id: z.string(),
	teamId: z.string(),
	timestamp: z.string(),
	type: z.string(),
	text: z.string().optional(),
	playerId: z.string().optional(),
})

const matchSchema = z.object({
	tournamentId: z.string(),
	teamAId: z.string(),
	teamBId: z.string(),
	scoreA: z.number().default(0),
	scoreB: z.number().default(0),
	time: z.iso.time(),
	status: z.enum(matchStatus),
	location: z.string().min(5).optional(),
	description: z.string().optional(),
	name: z.string().min(3).optional(),
	comments: z.array(commentSchema).default([]),
})

export { matchSchema, matchStatus }
