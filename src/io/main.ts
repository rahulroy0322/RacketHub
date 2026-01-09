import type { CommentaryTypesType } from '@/constants/type'
import { BACKEND_URL } from '@/constants/url'
import { addComment } from '@/stores/comments.store'
import { useLive } from '@/stores/live.store'
import type { CommentaryType } from '@/types'

// const socket = new WebSocket('ws://localhost:8000')

const socket = new WebSocket(BACKEND_URL)

socket.addEventListener('error', console.error)

type EventType =
	| {
			type: CommentaryTypesType
			data: CommentaryType
	  }
	| {
			type: 'join:room'
			data: string
	  }

const fair = (data: CommentaryType) => {
	const { teamA, teamB, scoreA, scoreB } = useLive.getState()
	const teamId = data.teamId

	if (teamId === teamA?._id) {
		useLive.setState({
			scoreA: scoreA + 1,
		})
	} else if (teamId === teamB?._id) {
		useLive.setState({
			scoreB: scoreB + 1,
		})
	}
}

const out = (data: CommentaryType) => {
	const { scoreA, scoreB, teamA, teamB } = useLive.getState()

	const teamId = data.teamId

	if (teamId === teamA?._id) {
		useLive.setState({
			scoreB: scoreB + 1,
		})
	} else if (teamId === teamB?._id) {
		useLive.setState({
			scoreB: scoreA + 1,
		})
	}
}

socket.addEventListener('message', (ev) => {
	try {
		const { type, data } = JSON.parse(ev.data) as EventType

		if (type !== 'join:room') {
			addComment(data)
		}

		switch (type) {
			case 'join:room':
				return
			case 'p:fair':
				return fair(data)
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
				return out(data)

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
