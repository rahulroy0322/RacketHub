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
	teams: TeamType['_id'][]
}

type TeamType = {
	_id: string
	name: string
	players: PlayerType[]
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
	location?: string
}

type PlayerType = {
	_id: string
	name: string
	location?: string
}

type CommentaryType = {
	id: string
	// matchId: MatchType['_id']
	timestamp: string
	type: CommentaryTypesType
	teamId: TeamType['_id']
	playerId?: PlayerType
	text?: string
}

type SuccessType<T = Record<string, unknown>> = {
	success: true
	data: T
}

type ErrorType<E = Error> = {
	success: false
	error: E
}

type ResType<T = Record<string, unknown>> = SuccessType<T> | ErrorType

// biome-ignore lint/suspicious/noExplicitAny: supress only
type AnyType = any

type UserType = {
	_id: string
	name: string
	email: string
	role: 'admin' | 'super' | 'user'
}

export type {
	UserType,
	AnyType,
	TournamentStatusType,
	MatchStatusType,
	TournamentType,
	TeamType,
	MatchType,
	CommentaryType,
	ResType,
	PlayerType,
}
