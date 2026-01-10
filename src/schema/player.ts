import { z } from 'zod'

const playerSchema = z.object({
	name: z.string().min(3),
	location: z.string().min(3).optional(),
})

export { playerSchema }
