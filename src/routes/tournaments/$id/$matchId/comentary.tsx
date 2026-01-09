import { createFileRoute, redirect } from '@tanstack/react-router'
import { BASE_URL } from '@/constants/url'
import { CommentaryPage } from '@/pages/comentary.page'
import type { CommentaryType, MatchType, ResType } from '@/types'

const fetchComments = async (id: string) => {
	const res = await fetch(`${BASE_URL}/comments/${id}`)

	const data = (await res.json()) as ResType<{
		comments: MatchType & {
			comments: CommentaryType[]
		}
	}>

	if (!data.success) {
		return data
	}

	return data.data.comments
}

const Route = createFileRoute('/tournaments/$id/$matchId/comentary')({
	component: CommentaryPage,

	loader: async ({ context, params: { matchId } }) => {
		const data = await context.queryClient.fetchQuery({
			queryKey: ['comments', matchId],
			queryFn: () => fetchComments(matchId),
		})

		if (!data || 'error' in data) {
			console.error(data.error.message)

			return redirect({
				href: '/',
			}) as never
		}

		return data
	},
})

export { Route }
