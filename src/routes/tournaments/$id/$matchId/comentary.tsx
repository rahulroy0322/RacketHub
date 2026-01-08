import { createFileRoute } from '@tanstack/react-router'
import { CommentaryPage } from '@/pages/comentary.page'

const Route = createFileRoute('/tournaments/$id/$matchId/comentary')({
	component: CommentaryPage,
})

export { Route }
