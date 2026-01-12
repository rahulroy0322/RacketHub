import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { SelectItem } from '@/components/ui/select'
import { createMatch, updateMatch } from '@/data/admin'
import { matchSchema } from '@/schema/match'
import type { MatchType, TeamType, TournamentType } from '@/types'
import { useAppForm } from '../form/main'

type ZodMatchType = z.infer<typeof matchSchema>

type MatchFormPropsType = {
	tournament: TournamentType
	match?: MatchType
}

const MatchForm: FC<MatchFormPropsType> = ({ tournament, match }) => {
	const router = useRouter()
	const navigate = useNavigate()
	const form = useAppForm({
		defaultValues: {
			name: match?.name || '',
			location: match?.location || '',
			description: match?.description || '',
			scoreA: match?.scoreA || 0,
			scoreB: match?.scoreB || 0,
			teamAId: match?.teamAId || '',
			teamBId: match?.teamBId || '',
			time: match?.time || '18:00',
			status: match?.status || 'scheduled',
			comments: [],
			tournamentId: tournament._id,
		} satisfies ZodMatchType as ZodMatchType,
		validators: {
			onSubmit: matchSchema,
		},
		onSubmit: ({ value }) => mutate(value as unknown as MatchType),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['player', form.state.values.name, form.state.values.location],
		mutationFn: async (value: MatchType) =>
			toast.promise(
				async () => {
					const data = await (match?._id
						? updateMatch(match._id, value)
						: createMatch(value))

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
					loading: match?._id ? 'Updating Match' : 'Creating Match',
					success: () => {
						if (match?._id) {
							router.invalidate({
								sync: true,
							})

							return 'Match Updated SuccessFully'
						}

						navigate({
							to: '/admin/dashboard',
						})

						return 'Match Created SuccessFully'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>Error {match?._id ? 'Updating' : 'Creating'} Match</b>
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

	const teams = tournament.teams as unknown as TeamType[]

	return (
		<form
			className="space-y-4"
			onSubmit={handleSubmit}
		>
			<FieldGroup>
				<form.AppField name="name">
					{({ Input }) => (
						<Input
							label="Match Name"
							placeholder="Enter Match name"
						/>
					)}
				</form.AppField>

				<form.AppField name="location">
					{({ Input }) => (
						<Input
							label="Location"
							placeholder="Enter Match location"
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

				<div className="grid grid-cols-2 gap-2">
					<form.AppField name="teamAId">
						{({ Select }) => (
							<Select
								label="Team A"
								placeholder="Select Team A"
							>
								{teams.map(({ _id, name }) => (
									<SelectItem
										key={_id}
										value={_id}
									>
										{name}
									</SelectItem>
								))}
							</Select>
						)}
					</form.AppField>

					<form.AppField name="teamBId">
						{({ Select }) => (
							<Select
								label="Team B"
								placeholder="Select Team B"
							>
								{teams.map(({ _id, name }) => (
									<SelectItem
										key={_id}
										value={_id}
									>
										{name}
									</SelectItem>
								))}
							</Select>
						)}
					</form.AppField>
				</div>

				<form.AppField name="time">
					{({ Input }) => (
						<Input
							label="Match Time"
							placeholder="Enter Match name"
							type="time"
						/>
					)}
				</form.AppField>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending}
				size="lg"
				type="submit"
			>
				{match?._id ? 'Update' : 'Create'} Match
			</Button>
		</form>
	)
}

type CreateMatchFormPropsType = Pick<MatchFormPropsType, 'tournament'>

const CreateMatchForm: FC<CreateMatchFormPropsType> = MatchForm

export { CreateMatchForm }
