import { type QueryClient, useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { register } from '@/data/auth'
import { registerSchema } from '@/schema/auth'
import { useAppForm } from '../form/main'
import { AuthForm } from './form'

type RegisterType = z.infer<typeof registerSchema>

type RegisterFormPropsType = {
	client: QueryClient
}

const RegisterForm: FC<RegisterFormPropsType> = ({ client }) => {
	const navigate = useNavigate()
	const form = useAppForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		} satisfies RegisterType,
		validators: {
			onSubmit: registerSchema,
		},
		onSubmit: ({ value }) => mutate(value),
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['register', form.state.values.email],
		//@ts-expect-error
		mutationFn: (data: RegisterType) => {
			toast.promise(register(data), {
				loading: 'Registering...',
				success: () => {
					navigate({
						to: '/',
					})
					client.invalidateQueries({
						queryKey: ['auth'],
					})
					return 'Regiseter succesfully'
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
						Create Account
					</Button>
				}
				desc="Register Your Self to RacketHub"
				title="Create New Account"
			>
				<FieldGroup>
					<form.AppField name="name">
						{(field) => (
							<field.Input
								label="Name"
								placeholder="John dow"
							/>
						)}
					</form.AppField>
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
							<Link to="/login">Already have account? Login here.</Link>
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

export { RegisterForm }
