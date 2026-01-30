import { updateMatch } from '@/data/admin'
import { saveToDb } from '@/data/main'
import { sendComment } from '@/io/main'
import useLive from '@/stores/live.store'
import type { CommentaryType, IOCommentaryType, TeamType } from '@/types'

const makeComment = (
	props: Pick<CommentaryType, 'type' | 'text' | 'teamId' | 'scoreA' | 'scoreB'>
): CommentaryType => ({
	id: Math.random().toString(),
	timestamp: new Date().toTimeString(),
	...props,
})

const commentToIoComment = ({
	scoreA,
	scoreB,
	...props
}: CommentaryType): IOCommentaryType => {
	const { teamA, teamB } = useLive.getState()

	if (!teamA || !teamB) {
		throw new Error('something went wrong!')
	}

	return {
		...props,
		scores: {
			[teamA._id]: scoreA,
			[teamB._id]: scoreB,
		},
	}
}

const getScore = (
	{
		team,
		teamId,
		score,
	}: {
		teamId: string
		team: TeamType
		score: number
	},
	fair: boolean = false
): number => {
	const { lastPoint, maxPoints } = useLive.getState()

	if (!lastPoint || !maxPoints) {
		// ! This should never called
		throw new Error('This should never called')
	}

	if (score >= maxPoints) {
		return score
	}
	if (team._id !== teamId) {
		return score
	}

	if (score === 0) {
		if (fair) {
			if (lastPoint !== team._id) {
				return 0
			}
		} else {
			if (lastPoint === team._id) {
				return 0
			}
		}
	}
	return ++score
}

const checkMatchWin = (
	{
		team,
		score,
	}: {
		team: TeamType
		score: number
	},
	fair: boolean = false
): boolean => {
	const { lastPoint, maxPoints } = useLive.getState()

	if (!lastPoint || !maxPoints) {
		// ! This should never called
		throw new Error('This should never called')
	}

	if (score < maxPoints) {
		return false
	}

	if (fair) {
		if (lastPoint !== team._id) {
			return false
		}
	} else {
		if (lastPoint !== team._id) {
			return false
		}
	}

	return true
}

const getTeamName = (teamId: TeamType['_id'] | null): null | string => {
	if (!teamId) {
		return null
	}
	const { teamA, teamB } = useLive.getState()

	if (teamA?._id === teamId) {
		return teamA.name
	}

	if (teamB?._id === teamId) {
		return teamB.name
	}

	return null
}

const matchCompleate = async ({ matchId }: { matchId: string }) => {
	const { scoreA, scoreB, lastPoint } = useLive.getState()
	const comment = makeComment({
		type: 'compleate',
		text: `Team "${getTeamName(lastPoint)}" had own Match`,
		teamId: lastPoint ?? '',
		scoreA,
		scoreB,
	})
	sendComment({
		type: 'compleate',
		matchId,
		data: commentToIoComment(comment),
	})

	const [_comment, match] = await Promise.all([
		saveToDb(matchId, comment),
		updateMatch(matchId, { status: 'completed' }),
	])

	if (!comment || !match) {
		throw new Error('some thing went wrong')
	}

	if ('error' in _comment) {
		if ('message' in _comment.error) {
			throw _comment.error
		}
		throw new Error(_comment.error)
	}

	if ('error' in match) {
		if ('message' in match.error) {
			throw match.error
		}
		throw new Error(match.error)
	}
}

export {
	makeComment,
	commentToIoComment,
	checkMatchWin,
	getScore,
	matchCompleate,
}
