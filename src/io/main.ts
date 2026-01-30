import { io } from 'socket.io-client'
import { BACKEND_URL } from '@/constants/url'
import type { CommentaryType, IOCommentaryType } from '@/types'

const socket = io(BACKEND_URL, {
	autoConnect: false,
})

const joinRoom = (matchId: string) => {
	if (socket.disconnected) {
		socket.connect()
	}

	socket.emit('JOIN:ROOM', {
		matchId,
	})
}

const sendComment = (msg: MSGType) => {
	if (socket.disconnected) {
		socket.connect()
	}

	socket.emit('MSG', msg)
}

type MSGType = {
	type: CommentaryType['type']
	matchId: string
	data: IOCommentaryType
}

export { socket, joinRoom, sendComment }

export type { MSGType }
