import { create } from 'zustand'
import type { CommentaryType } from '@/types'

type UseCommentsType = {
	comments: CommentaryType[]
}

const useComments = create<UseCommentsType>(() => ({
	comments: [],
}))

const { getState: get, setState: set } = useComments

const addComment = (comment: CommentaryType) => {
	const { comments } = get()

	set({
		comments: [comment, ...comments],
	})
}

export { useComments, addComment }

export default useComments
