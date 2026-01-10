import type { FC, ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

type AdminFormPropsType = {
	title: string
	description: string
	children: ReactNode
}

const AdminForm: FC<AdminFormPropsType> = ({
	title,
	description,
	children,
}) => (
	<div className="h-[calc(100vh-(1rem*2))] flex items-center justify-center overflow-hidden">
		<Card className="w-full max-h-3/4 max-w-96">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="overflow-auto">{children}</CardContent>
		</Card>
	</div>
)

export { AdminForm }
