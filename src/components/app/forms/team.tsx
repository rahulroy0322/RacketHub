import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { MultiSelectGroup, MultiSelectItem } from '@/components/ui/multi-select'
import { createTeam, updateTeam } from '@/data/admin'
import { teamSchema } from '@/schema/team'
import type { PlayerType, TeamType } from '@/types'
import { useAppForm } from '../form/main'

type ZodTeamType = z.infer<typeof teamSchema>

type TeamFormPropsType = {
	players: PlayerType[]
	team?: TeamType
}

const TeamForm: FC<TeamFormPropsType> = ({ players, team }) => {
	const navigate = useNavigate()
	const router = useRouter()
	const form = useAppForm({
		defaultValues: {
			name: team?.name || '',
			players: team?.players.map(({ _id }) => _id) || [],
			location: team?.location || '',
		} satisfies ZodTeamType as ZodTeamType,
		validators: {
			onSubmit: teamSchema,
		},
		onSubmit: ({ value }) => mutate(value as unknown as TeamType),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['team', form.state.values.name],
		mutationFn: async (value: TeamType) =>
			toast.promise(
				async () => {
					const data = await (team?._id
						? updateTeam(team._id, value)
						: createTeam(value))

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
					loading: team?._id ? 'Updating Team' : 'Creating Team',
					success: () => {
						if (team?._id) {
							router.invalidate({
								sync: true,
							})

							return 'Team Updated SuccessFully'
						}

						navigate({
							to: '/admin/dashboard',
						})

						return 'Team Created SuccessFully'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>Error {team?._id ? 'Updating' : 'Creating'} Team</b>
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
							label="Team Name"
							placeholder="Enter team name"
						/>
					)}
				</form.AppField>

				<form.AppField name="players">
					{({ MultiSelect }) => (
						<MultiSelect
							label="Players (minimum 2)"
							placeholder="Select Players..."
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
						</MultiSelect>
					)}
				</form.AppField>

				<form.AppField name="location">
					{({ Input }) => (
						<Input
							label="Team Location"
							placeholder="Enter team location"
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
				{team?._id ? 'Update' : 'Create'} Team
			</Button>
		</form>
	)
}

type CreateTeamFormPropsType = Omit<TeamFormPropsType, 'team'>

const CreateTeamForm: FC<CreateTeamFormPropsType> = TeamForm

type UpdateTeamFormPropsType = TeamFormPropsType & {
	team: TeamType
}
const UpdateTeamForm: FC<UpdateTeamFormPropsType> = TeamForm

export { CreateTeamForm, UpdateTeamForm }
