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
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from '@/components/ui/multi-select'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createTournament } from '@/data/admin'
import { cn } from '@/lib/utils'
import { tournamentSchema, tournamentStatus } from '@/schema/tournament'
import type { AnyType, TeamType, TournamentType } from '@/types'

type CreateTournamentFormPropsType = {
	teams: TeamType[]
}

const CreateTournamentForm: FC<CreateTournamentFormPropsType> = ({ teams }) => {
	const navigate = useNavigate()
	const form = useForm({
		defaultValues: {
			name: '',
			location: '',
			description: undefined,
			startDate: '',
			status: 'upcoming',
			teams: [],
		} satisfies z.infer<typeof tournamentSchema>,
		validators: {
			onSubmit: tournamentSchema as unknown as AnyType,
		},
		onSubmit: () => mutate(),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['team', form.state.values.name],
		mutationFn: async () => {
			const tournament = await createTournament(
				form.state.values as unknown as TournamentType
			)
			if (tournament?._id) {
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
								<FieldLabel htmlFor={name}>Tournament Name</FieldLabel>
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
									placeholder="Enter Tournament name"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name="location">
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
									placeholder="Enter Tournament location"
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
									onChange={(e) => handleChange(e.target.value)}
									placeholder="Enter Tournament description"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name="status">
					{({
						state: {
							meta: { isTouched, isValid, errors },
							value,
						},
						name,
					}) => {
						const isInvalid = isTouched && !isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={name}>Status</FieldLabel>

								<Select
									disabled
									value={value}
								>
									<SelectTrigger>
										<SelectValue
											className="capitalize"
											placeholder="Tournament Status"
										/>
									</SelectTrigger>
									<SelectContent>
										{tournamentStatus.map((status) => (
											<SelectItem
												className="capitalize"
												key={status}
												value={status}
											>
												{status.at(0)?.toUpperCase()}
												{status.slice(1)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name="startDate">
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
								<FieldLabel htmlFor={name}>Start Date</FieldLabel>
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
									placeholder="Enter Tournament location"
									type="date"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name={'teams' as AnyType}>
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
								<FieldLabel htmlFor={name}>Select Teams (minimum 2)</FieldLabel>
								<MultiSelect
									defaultValues={value as unknown as string[]}
									onValuesChange={(e) => handleChange(e as unknown as string)}
								>
									<MultiSelectTrigger
										className={cn('w-full', {
											'border-destructive!': isInvalid,
										})}
									>
										<MultiSelectValue placeholder="Select Teams..." />
									</MultiSelectTrigger>
									<MultiSelectContent
										aria-invalid={isInvalid}
										id={name}
										onBlur={handleBlur}
									>
										<MultiSelectGroup>
											{teams.map(({ _id, name }) => (
												<MultiSelectItem
													key={_id}
													value={_id}
												>
													<div className="flex flex-col gap-2 items-start">
														<span>{name}</span>
													</div>
												</MultiSelectItem>
											))}
										</MultiSelectGroup>
									</MultiSelectContent>
								</MultiSelect>

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

export { CreateTournamentForm }
