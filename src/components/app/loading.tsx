import { Loader } from 'lucide-react'
import type { FC } from 'react'

const Loading: FC = () => {
	return (
		<div className="bg-muted flex items-center justify-center fixed inset-0">
			<Loader className="size-16 animate-spin animation-duration-[2.5s]" />
		</div>
	)
}

export { Loading }
