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
	// scheduledTime?: string;
	// matchDate: string;

	tournamentId: TournamentType['_id']
	teamAId: TeamType['_id']
	teamBId: TeamType['_id']
	scoreA: number
	scoreB: number
	time: string
	status: MatchStatusType
	location?: string | undefined
	description?: string | undefined
	name?: string | undefined
	maxPoints: number
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
	type: CommentaryTypesType | 'compleate' | 'toss'
	teamId: TeamType['_id']
	playerId?: PlayerType
	text?: string
	scoreA: number
	scoreB: number
}

type IOCommentaryType = Omit<CommentaryType, 'scoreA' | 'scoreB'> & {
	scores: Record<string, number>
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
	IOCommentaryType,
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
