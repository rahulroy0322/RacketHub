import { z } from 'zod'

const matchStatus = <const>['scheduled', 'live', 'completed']

const commentSchema = z.object({
	id: z.string().min(1, 'Id is required'),
	teamId: z.string().transform((v) => v || undefined),
	timestamp: z.string().min(1, 'timestamp is required'),
	type: z.string().min(1, 'Type is required'),
	text: z.string().transform((v) => v || undefined),
	playerId: z.string().transform((v) => v || undefined),
})

const matchSchema = z.object({
	tournamentId: z.string(),
	teamAId: z.string().min(1, 'Team A Id is required'),
	teamBId: z.string().min(1, 'Team A Id is required'),
	scoreA: z.number(),
	scoreB: z.number(),
	time: z.iso.time(),
	status: z.enum(matchStatus),
	location: z
		.string()
		.min(5)
		.transform((v) => v || undefined),
	description: z.string().transform((v) => v || undefined),
	name: z.string().transform((v) => v || undefined),
	comments: z.array(commentSchema),
})

export { matchSchema, matchStatus }
