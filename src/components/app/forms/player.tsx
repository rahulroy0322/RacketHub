import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback } from 'react'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createPlayer } from '@/data/admin'
import { cn } from '@/lib/utils'
import { playerSchema } from '@/schema/player'
import type { AnyType, PlayerType } from '@/types'

const CreatePlayerForm: FC = () => {
	const navigate = useNavigate()
	const form = useForm({
		defaultValues: {
			name: '',
			location: undefined,
		} satisfies z.infer<typeof playerSchema>,
		validators: {
			onSubmit: playerSchema as unknown as AnyType,
		},
		onSubmit: () => mutate(),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['player', form.state.values.name, form.state.values.location],
		mutationFn: async () => {
			const player = await createPlayer(form.state.values as PlayerType)

			if (player?._id) {
				navigate({
					to: '/admin/dashboard',
				})
			}
		},
	})

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			form.handleSubmit()
		},
		[form.handleSubmit]
	)

	return (
		<form
			className="space-y-4"
			onSubmit={handleSubmit}
		>
			<FieldGroup>
				<form.Field name="name">
					{({
						state: {
							meta: { isTouched, isValid, errors },
							value,
						},
						handleBlur,
						handleChange,
						name,
					}) => {
						const isInvalid = isTouched && !isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={name}>Player Name</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="off"
									className={cn({
										'border-destructive!': isInvalid,
									})}
									id={name}
									name={name}
									onBlur={handleBlur}
									onChange={(e) => handleChange(e.target.value)}
									placeholder="Enter player name"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name={'location' as AnyType}>
					{({
						state: {
							meta: { isTouched, isValid, errors },
							value,
						},
						handleBlur,
						handleChange,
						name,
					}) => {
						const isInvalid = isTouched && !isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={name}>Location</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="off"
									className={cn({
										'border-destructive!': isInvalid,
									})}
									id={name}
									name={name}
									onBlur={handleBlur}
									onChange={(e) => handleChange(e.target.value)}
									placeholder="Enter player location"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>
			</FieldGroup>
			<Button
				className="w-full"
				disabled={isPending}
				size="lg"
				type="submit"
			>
				Add Player
			</Button>
		</form>
	)
}

export { CreatePlayerForm }
