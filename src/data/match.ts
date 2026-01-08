import type { MatchType } from '@/types'
import { mockTeams } from './team'

const mockMatches: MatchType[] = [
	{
		_id: '1',
		tournamentId: '1',
		teamAId: mockTeams[0]._id,
		teamBId: mockTeams[1]._id,
		scoreA: 15,
		scoreB: 12,
		status: 'live',
		time: new Date(2026, 1, 15, 18, 10, 0).toString(),
	},
	//"2026-01-07T08:25:55.866Z"
	{
		_id: '2',
		tournamentId: '1',
		teamAId: mockTeams[2]._id,
		teamBId: mockTeams[3]._id,
		scoreA: 0,
		scoreB: 0,
		status: 'scheduled',
		time: new Date(2026, 0, 7, 18, 10, 0).toString(),
	},
]

export { mockMatches }
