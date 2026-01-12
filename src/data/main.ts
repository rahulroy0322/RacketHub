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
		comments: MatchType & {
			comments: CommentaryType[]
		}
	}>

	if (!_data.success) {
		return _data
	}
	// biome-ignore lint/suspicious/noConsole: debug only
	console.log('created', import.meta.env.DEV ? _data.data : undefined)

	return _data.data.comments
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
export { saveToDb, destroyTournament }
