import type { TeamType } from '@/types'

const mockTeams: TeamType[] = [
	{
		_id: '1',
		name: 'Thunder Strikers',
		players: ['John Doe', 'Jane Smith'],
		tournamentId: '1',
	},
	{
		_id: '2',
		name: 'Lightning Bolts',
		players: ['Mike Johnson', 'Sarah Williams'],
		tournamentId: '1',
	},
	{
		_id: '3',
		name: 'Storm Chasers',
		players: ['Chris Brown', 'Emily Davis'],
		tournamentId: '1',
	},
	{
		_id: '4',
		name: 'Wave Riders',
		players: ['David Lee', 'Anna Martinez'],
		tournamentId: '1',
	},
]

export { mockTeams }
