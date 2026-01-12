import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { MultiSelectGroup, MultiSelectItem } from '@/components/ui/multi-select'
import { SelectItem } from '@/components/ui/select'
import { createTournament, updateTournament } from '@/data/admin'
import { tournamentSchema, tournamentStatus } from '@/schema/tournament'
import type { TeamType, TournamentType } from '@/types'
import { useAppForm } from '../form/main'

type TournamentFormPropsType = {
	teams: TeamType[]
	tournament?: TournamentType
}
type ZodTournamentType = z.infer<typeof tournamentSchema>

const TournamentForm: FC<TournamentFormPropsType> = ({ teams, tournament }) => {
	const router = useRouter()
	const navigate = useNavigate()
	const form = useAppForm({
		defaultValues: {
			name: tournament?.name || '',
			location: tournament?.location || '',
			description: tournament?.description || '',
			startDate: tournament?.startDate || '',
			status: tournament?.status || 'upcoming',
			teams: tournament?.teams || [],
		} satisfies ZodTournamentType as ZodTournamentType,
		validators: {
			onSubmit: tournamentSchema,
		},
		onSubmit: ({ value }) => mutate(value as TournamentType),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['team', form.state.values.name],
		mutationFn: async (value: TournamentType) =>
			toast.promise(
				async () => {
					const data = await (tournament?._id
						? updateTournament(tournament._id, value)
						: createTournament(value))

					if (!data) {
						throw new Error('some thing went wrong')
					}

					if ('error' in data) {
						if ('message' in data.error) {
							throw data.error
						}
						throw new Error(data.error)
					}
				},
				{
					loading: tournament?._id
						? 'Updating Tournament'
						: 'Creating Tournament',
					success: () => {
						if (tournament?._id) {
							router.invalidate({
								sync: true,
							})

							return 'Tournament Updated SuccessFully'
						}

						navigate({
							to: '/admin/dashboard',
						})

						return 'Tournament Created SuccessFully'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>
									Error {tournament?._id ? 'Updating' : 'Creating'} Tournament
								</b>
								<p>{message}</p>
							</div>
						)
					},
				}
			),
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
				<form.AppField name="name">
					{({ Input }) => (
						<Input
							label="Tournament Name"
							placeholder="Enter Tournament name"
						/>
					)}
				</form.AppField>

				<form.AppField name="location">
					{({ Input }) => (
						<Input
							label="Location"
							placeholder="Enter Tournament location"
						/>
					)}
				</form.AppField>

				<form.AppField name="description">
					{({ Textarea }) => (
						<Textarea
							label="Description"
							placeholder="Enter Tournament description"
						/>
					)}
				</form.AppField>

				<form.AppField name="status">
					{({ Select }) => (
						<Select
							disabled
							label="Status"
							placeholder="Tournament Status"
						>
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
						</Select>
					)}
				</form.AppField>

				<form.AppField name="startDate">
					{({ Input }) => (
						<Input
							label="Start Date"
							placeholder="Enter Tournament location"
							type="date"
						/>
					)}
				</form.AppField>

				<form.AppField name="teams">
					{({ MultiSelect }) => (
						<MultiSelect
							label="Select Teams (minimum 2)"
							placeholder="Select Teams..."
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
						</MultiSelect>
					)}
				</form.AppField>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending}
				size="lg"
				type="submit"
			>
				{tournament?._id ? 'Update' : 'Create'} Tournament
			</Button>
		</form>
	)
}

const CreateTournamentForm: FC<TournamentFormPropsType> = TournamentForm

export { CreateTournamentForm }
