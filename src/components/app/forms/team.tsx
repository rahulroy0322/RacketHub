import { useForm } from '@tanstack/react-form'
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
import { cn } from '@/lib/utils'
import { teamSchema } from '@/schema/team'
import type { AnyType, PlayerType } from '@/types'

const players: PlayerType[] = [
	{
		_id: '1',
		name: 'x',
		location: 'xas',
	},
	{
		_id: '2',
		name: 'xxsaoxj',
		location: 'xas',
	},
	{
		_id: '3',
		name: 'xcascsa',
		location: 'xas',
	},
	{
		_id: '4',
		name: 'xcsanc',
	},
]

const CreateTeamForm: FC = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			players: [],
			location: undefined,
		} satisfies z.infer<typeof teamSchema>,
		validators: {
			onSubmit: teamSchema as unknown as AnyType,
		},
		onSubmit({ value }) {
			// biome-ignore lint/suspicious/noConsole: <xplanation>
			console.log(value)
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
								<FieldLabel htmlFor={name}>Team Name</FieldLabel>
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
									placeholder="Enter team name"
									value={value}
								/>

								{errors.length ? <FieldError errors={errors} /> : null}
							</Field>
						)
					}}
				</form.Field>

				<form.Field name={'players' as unknown as AnyType}>
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
								<FieldLabel htmlFor={name}>
									Select Players (minimum 2)
								</FieldLabel>
								<MultiSelect
									defaultValues={value as unknown as string[]}
									onValuesChange={(e) => handleChange(e as unknown as string)}
								>
									<MultiSelectTrigger
										className={cn('w-full', {
											'border-destructive!': isInvalid,
										})}
									>
										<MultiSelectValue placeholder="Select Players..." />
									</MultiSelectTrigger>
									<MultiSelectContent
										aria-invalid={isInvalid}
										id={name}
										onBlur={handleBlur}
									>
										<MultiSelectGroup>
											{players.map(({ _id, name }) => (
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

										handleChange(value.length ? value : undefined)
									}}
									placeholder="Enter team location"
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
				size="lg"
				type="submit"
			>
				Create Team
			</Button>
		</form>
	)
}

export { CreateTeamForm }
