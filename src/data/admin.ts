import { BASE_URL } from '@/constants/url'
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
		return console.error(data.error)
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

const createTournament = async (tournament: TournamentType) => {
	const data = await post<{
		tournament: TournamentType
	}>('tournaments', tournament)

	if (!data.success) {
		return console.error(data.error)
	}
	return data.data.tournament
}

const createMatch = async (match: MatchType) => {
	const data = await post<{
		match: MatchType
	}>('matches', match)

	if (!data.success) {
		return console.error(data.error)
	}
	return data.data.match
}

export { createPlayer, createTeam, createTournament, createMatch }
