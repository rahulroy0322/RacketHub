import type { FC } from 'react'
import type { CommentaryTypesType } from '@/constants/type'
import { typeToTitleMap } from '@/constants/type-map'
import { Button } from '../ui/button'

type ControllButtonPropsType = {
	point: CommentaryTypesType
} & Parameters<typeof Button>[0]

const ControllButton: FC<ControllButtonPropsType> = ({ point }) => {
	return (
		<Button variant={point === 'p:fair' ? 'default' : 'destructive'}>
			{typeToTitleMap[point]}
		</Button>
	)
}

export { ControllButton }
