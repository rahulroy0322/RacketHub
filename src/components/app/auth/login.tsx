import { type QueryClient, useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { login } from '@/data/auth'
import { loginSchema } from '@/schema/auth'
import { useAppForm } from '../form/main'
import { AuthForm } from './form'

type LoginType = z.infer<typeof loginSchema>

type LoginFormPropsType = {
	client: QueryClient
}

const LoginForm: FC<LoginFormPropsType> = ({ client }) => {
	const navigate = useNavigate()
	const form = useAppForm({
		defaultValues: {
			email: '',
			password: '',
		} satisfies LoginType,
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: ({ value }) => mutate(value),
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['register', form.state.values.email],
		//@ts-expect-error
		mutationFn: (data: LoginType) => {
			toast.promise(login(data), {
				loading: 'Login...',
				success: () => {
					navigate({
						to: '/',
					})
					client.invalidateQueries({
						queryKey: ['auth'],
					})
					return 'Login succesfully'
				},
				error: (e) => {
					if ('message' in e) {
						return e.message
					}

					return 'SomeThing went wrong'
				},
			})
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<AuthForm
				actions={
					<Button
						disabled={isPending}
						type="submit"
					>
						Login
					</Button>
				}
				desc="Welcome Back to your Account"
				title="Login To Your Account"
			>
				<FieldGroup>
					<form.AppField name="email">
						{(field) => (
							<field.Input
								label="Email"
								placeholder="john@example.com"
								type="email"
							/>
						)}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<field.Input
								label="Password"
								placeholder={'*'.repeat(8)}
								type="password"
							/>
						)}
					</form.AppField>
				</FieldGroup>
				<FieldGroup>
					<div className="flex items-center justify-between">
						<Button
							asChild
							variant={'link'}
						>
							<Link to="/register">Don't have account? Create Here.</Link>
						</Button>

						<Button
							asChild
							variant={'link'}
						>
							<Link to="/forget">Forget Password</Link>
						</Button>
					</div>
				</FieldGroup>
			</AuthForm>
		</form>
	)
}

export { LoginForm }
