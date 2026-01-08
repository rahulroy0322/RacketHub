import type { CommentaryTypesType } from './constants/type'

type TournamentStatusType = 'upcoming' | 'live' | 'completed'
type MatchStatusType = 'scheduled' | 'live' | 'completed'

type TournamentType = {
	_id: string
	name: string
	startDate: string
	location: string
	status: TournamentStatusType
	description?: string
}

type TeamType = {
	_id: string
	name: string
	players: string[]
	tournamentId: TournamentType['_id']
	location?: string
}

type MatchType = {
	_id: string
	tournamentId: TournamentType['_id']
	teamAId: TeamType['_id']
	teamBId: TeamType['_id']
	scoreA: number
	scoreB: number
	status: MatchStatusType
	// scheduledTime?: string;
	// matchDate: string;
	time: string
}

type CommentaryType = {
	_id: string
	matchId: MatchType['_id']
	timestamp: string
	type: CommentaryTypesType
	teamId: TeamType['_id']
	player?: string
	text?: string
}

export type {
	TournamentStatusType,
	MatchStatusType,
	TournamentType,
	TeamType,
	MatchType,
	CommentaryType,
}
