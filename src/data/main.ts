import { BASE_URL } from '@/constants/url'
import { getToken } from '@/lib/token'
import type {
	CommentaryType,
	MatchType,
	ResType,
	TournamentType,
} from '@/types'

const saveToDb = async (id: string, data: CommentaryType) => {
	const res = await fetch(`${BASE_URL}/comments/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(data),
	})

	const _data = (await res.json()) as ResType<{
		comment: MatchType & {
			comment: CommentaryType
		}
	}>

	if (!_data.success) {
		return _data
	}

	return _data.data.comment
}

const destroyTournament = async (id: string) => {
	const res = await fetch(`${BASE_URL}/tournaments/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
	})

	const _data = (await res.json()) as ResType<{
		tournament: TournamentType | null
	}>

	if (!_data.success) {
		return _data
	}
	return _data.data.tournament
}

const startMatch = async (
	id: string,
	{ data, maxPoint }: { data: CommentaryType; maxPoint: number }
) => {
	const res = await fetch(`${BASE_URL}/matches/${id}/start`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify({ data, maxPoints: maxPoint }),
	})

	const _data = (await res.json()) as ResType<{
		match: MatchType & {
			comment: CommentaryType[]
		}
	}>

	if (!_data.success) {
		return _data
	}

	return _data.data.match
}

export { saveToDb, destroyTournament, startMatch }
