import type { TournamentType } from '@/types'

const mockTournaments: TournamentType[] = [
	{
		_id: '1',
		name: 'Spring Championship 2025',
		startDate: '2025-03-15',
		location: 'Central Sports Arena',
		status: 'live',
		description: 'Annual spring tournament featuring top regional teams',
	},
	{
		_id: '2',
		name: 'Summer Cup',
		startDate: '2025-06-20',
		location: 'Riverside Courts',
		status: 'upcoming',
		description: 'Competitive summer tournament',
	},
	{
		_id: '3',
		name: 'Winter Classic',
		startDate: '2024-12-10',
		location: 'Downtown Arena',
		status: 'completed',
		description: 'Year-end championship tournament',
	},
]

export { mockTournaments }
