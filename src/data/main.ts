import { BASE_URL } from '@/constants/url'
import type { CommentaryType, MatchType, ResType } from '@/types'

const saveToDb = async (id: string, data: CommentaryType) => {
	const res = await fetch(`${BASE_URL}/comments/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	const _data = (await res.json()) as ResType<{
		comments: MatchType & {
			comments: CommentaryType[]
		}
	}>

	if (!_data.success) {
		return console.error(_data.error)
	}
	// biome-ignore lint/suspicious/noConsole: debug only
	console.log('created', import.meta.env.DEV ? _data.data : undefined)
}

const updateStatus = async (id: string, status: MatchType['status']) => {
	const res = await fetch(`${BASE_URL}/matches/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			status,
		} satisfies Partial<MatchType>),
	})

	const _data = (await res.json()) as ResType<{
		match: MatchType | null
	}>

	if (!_data.success) {
		return console.error(_data.error)
	}
	return _data.data.match
}

export { saveToDb, updateStatus }
