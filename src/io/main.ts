import type { CommentaryTypesType } from '@/constants/type'
import { BACKEND_URL } from '@/constants/url'
import { addComment } from '@/stores/comments.store'
import { useLive } from '@/stores/live.store'
import type { CommentaryType, IOCommentaryType } from '@/types'

const socket = new WebSocket(BACKEND_URL)

socket.addEventListener('error', console.error)

type EventType =
	| {
			type: CommentaryTypesType | 'compleate'
			data: IOCommentaryType
	  }
	| {
			type: 'join:room'
			data: string
	  }

const score = (scores: IOCommentaryType['scores']) => {
	const { teamA, teamB } = useLive.getState()

	if (!teamA || !teamB) {
		return
	}

	if (!(teamA._id in scores) || !(teamB._id in scores)) {
		return
	}

	useLive.setState({
		scoreA: scores[teamA._id],
		scoreB: scores[teamB._id],
	})
}

socket.addEventListener('message', (ev) => {
	try {
		const { type, data } = JSON.parse(ev.data) as EventType

		if (type !== 'join:room') {
			// ! TODO
			addComment(data as unknown as CommentaryType)
		}

		switch (type) {
			case 'join:room':
				return
			case 'p:fair':
			case 'p:out':
			case 'ir:net':
			case 'ir:touch':
			case 'ir:double':
			case 'ir:over-net':
			case 'ir:under-net':
			case 's:hight':
			case 's:foot-line':
			case 's:foot-ground':
			case 's:contact':
			case 's:court':
			case 's:flick':
				return score(data.scores)

			case 'compleate':
				return
			default:
				console.error(
					{
						type,
						data,
					},
					`"${type satisfies never}" not implimented yet!` as string
				)
		}
	} catch (e) {
		console.error(e)
	}
})

const send = (event: EventType) => {
	socket.send(JSON.stringify(event))
}

export { send }
