import type { FC, ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

type AuthFormPropsType = {
	children: ReactNode
	actions: ReactNode
	title: ReactNode | string
	desc: ReactNode | string
}

const AuthForm: FC<AuthFormPropsType> = ({
	actions,
	children,
	desc,
	title,
}) => (
	<Card className="max-w-prose m-auto">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{desc}</CardDescription>
		</CardHeader>
		<CardContent>{children}</CardContent>

		<CardFooter>{actions}</CardFooter>
	</Card>
)
export { AuthForm }
