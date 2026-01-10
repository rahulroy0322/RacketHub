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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createMatch } from '@/data/admin'
import { cn } from '@/lib/utils'
import { matchSchema } from '@/schema/match'
import type { AnyType, MatchType, TeamType, TournamentType } from '@/types'

type CreateMatchFormPropsType = {
	tournament: TournamentType
}

const CreateMatchForm: FC<CreateMatchFormPropsType> = ({ tournament }) => {
	const navigate = useNavigate()
	const form = useForm({
		defaultValues: {
			name: '',
			location: undefined,
			description: undefined,
			scoreA: 0,
			scoreB: 0,
			teamAId: undefined,
			teamBId: undefined,
			time: '18:00',
			status: 'scheduled',
			comments: [],
			tournamentId: tournament._id,
		} as unknown as z.infer<typeof matchSchema>,
		validators: {
			onSubmit: matchSchema as AnyType,
		},
		onSubmit: () => mutate(),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['player', form.state.values.name, form.state.values.location],
		mutationFn: async () => {
			const player = await createMatch(
				form.state.values as unknown as MatchType
			)

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

	const teams = tournament.teams as unknown as TeamType[]

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
								<FieldLabel htmlFor={name}>Match Name</FieldLabel>
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
									placeholder="Enter Match name"
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
									onChange={(e) => {
										const value = e.target.value

										//@ts-expect-error
										handleChange(value.length ? value : undefined)
									}}
									placeholder="Enter Match location"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name={'description' as AnyType}>
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
								<FieldLabel htmlFor={name}>Description</FieldLabel>
								<Textarea
									aria-invalid={isInvalid}
									autoComplete="off"
									className={cn({
										'border-destructive!': isInvalid,
									})}
									id={name}
									name={name}
									onBlur={handleBlur}
									onChange={(e) => {
										const value = e.target.value

										//@ts-expect-error
										handleChange(value.length ? value : undefined)
									}}
									placeholder="Enter Tournament description"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<div className="grid grid-cols-2 gap-2">
					<form.Field name="teamAId">
						{({
							state: {
								meta: { isTouched, isValid, errors },
								value,
							},
							name,
							handleBlur,
							handleChange,
						}) => {
							const isInvalid = isTouched && !isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={name}>Team A</FieldLabel>

									<Select
										aria-invalid={isInvalid}
										autoComplete="off"
										name={name}
										onValueChange={(value) => handleChange(value)}
										value={value}
									>
										<SelectTrigger
											id={name}
											onBlur={handleBlur}
										>
											<SelectValue placeholder="Select Team A" />
										</SelectTrigger>
										<SelectContent>
											{teams.map(({ _id, name }) => (
												<SelectItem
													key={_id}
													value={_id}
												>
													{name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									{errors.length ? <FieldError errors={errors} /> : null}
								</Field>
							)
						}}
					</form.Field>
					<form.Field name="teamBId">
						{({
							state: {
								meta: { isTouched, isValid, errors },
								value,
							},
							name,
							handleBlur,
							handleChange,
						}) => {
							const isInvalid = isTouched && !isValid
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={name}>Team B</FieldLabel>

									<Select
										aria-invalid={isInvalid}
										autoComplete="off"
										name={name}
										onValueChange={(value) => handleChange(value)}
										value={value}
									>
										<SelectTrigger
											id={name}
											onBlur={handleBlur}
										>
											<SelectValue placeholder="Select Team B" />
										</SelectTrigger>
										<SelectContent>
											{teams.map(({ _id, name }) => (
												<SelectItem
													key={_id}
													value={_id}
												>
													{name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>

									{errors.length ? <FieldError errors={errors} /> : null}
								</Field>
							)
						}}
					</form.Field>
				</div>

				<form.Field name="time">
					{({
						state: {
							meta: { isTouched, isValid, errors },
							value,
						},
						name,
						handleBlur,
						handleChange,
					}) => {
						const isInvalid = isTouched && !isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={name}>Match Time</FieldLabel>
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
									placeholder="Enter Match name"
									type="time"
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
				Create Tournament
			</Button>
		</form>
	)
}

export { CreateMatchForm }
