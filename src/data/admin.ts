import { BASE_URL } from '@/constants/url'
import { getToken } from '@/lib/token'
import type {
	MatchType,
	PlayerType,
	ResType,
	TeamType,
	TournamentType,
} from '@/types'

const post = async <T extends Record<string, unknown>>(
	route: string,
	data: unknown
) => {
	const res = await fetch(`${BASE_URL}/${route}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(data),
	})

	return (await res.json()) as ResType<{
		[Key in keyof T]: T[Key] | null
	}>
}

const patch = async <T extends Record<string, unknown>>(
	route: string,
	data: unknown
) => {
	const res = await fetch(`${BASE_URL}/${route}/`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(data),
	})

	return (await res.json()) as ResType<{
		[Key in keyof T]: T[Key] | null
	}>
}

const createPlayer = async (player: PlayerType) => {
	const data = await post<{
		player: PlayerType
	}>('players', player)

	if (!data.success) {
		return data
	}
	return data.data.player
}

const updatePlayer = async (id: string, player: Partial<PlayerType>) => {
	const data = await patch<{
		player: PlayerType
	}>(`players/${id}`, player)

	if (!data.success) {
		return data
	}
	return data.data.player
}

const createTeam = async (team: TeamType) => {
	const data = await post<{
		team: TeamType
	}>('teams', team)

	if (!data.success) {
		return console.error(data.error)
	}
	return data.data.team
}

const updateTeam = async (id: string, team: Partial<TeamType>) => {
	const data = await patch<{
		team: TeamType
	}>(`teams/${id}`, team)

	if (!data.success) {
		return data
	}
	return data.data.team
}

const createTournament = async (tournament: TournamentType) => {
	const data = await post<{
		tournament: TournamentType
	}>('tournaments', tournament)

	if (!data.success) {
		return console.error(data.error)
	}
	return data.data.tournament
}

const updateTournament = async (
	id: string,
	tournament: Partial<TournamentType>
) => {
	const data = await patch<{
		tournament: TournamentType
	}>(`tournaments/${id}`, tournament)

	if (!data.success) {
		return data
	}
	return data.data.tournament
}

const createMatch = async (match: MatchType) => {
	const data = await post<{
		match: MatchType
	}>('matches', match)

	if (!data.success) {
		return data
	}
	return data.data.match
}

const updateMatch = async (id: string, match: Partial<MatchType>) => {
	const data = await patch<{
		match: MatchType
	}>(`matches/${id}`, match)

	if (!data.success) {
		return data
	}
	return data.data.match
}

export {
	createPlayer,
	createTeam,
	createTournament,
	createMatch,
	updatePlayer,
	updateTeam,
	updateTournament,
	updateMatch,
}
