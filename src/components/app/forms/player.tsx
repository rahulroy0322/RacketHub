import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { type FC, type FormEvent, useCallback } from 'react'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { createPlayer, updatePlayer } from '@/data/admin'
import { playerSchema } from '@/schema/player'
import type { PlayerType, UserType } from '@/types'
import { useAppForm } from '../form/main'

type ZodPlayerType = z.infer<typeof playerSchema>

type PlayerFormPropsType = {
	user?: PlayerType
}

const PlayerForm: FC<PlayerFormPropsType> = ({ user }) => {
	const navigate = useNavigate()
	const router = useRouter()
	const form = useAppForm({
		defaultValues: {
			name: user?.name || '',
			location: user?.location || '',
		} satisfies ZodPlayerType as ZodPlayerType,
		validators: {
			onSubmit: playerSchema,
		},
		onSubmit: ({ value }) => mutate(value as PlayerType),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ['player', form.state.values.name, form.state.values.location],
		mutationFn: async (value: PlayerType) =>
			toast.promise(
				async () => {
					const data = await (user?._id
						? updatePlayer(user._id, value)
						: createPlayer(value))

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
					loading: user?._id ? 'Updating Player' : 'Creating Player',
					success: () => {
						if (user?._id) {
							router.invalidate({
								sync: true,
							})

							return 'Player Updated SuccessFully'
						}

						navigate({
							to: '/admin/dashboard',
						})

						return 'Player Created SuccessFully'
					},
					error: (e: Error) => {
						console.error(e)
						const { message } = e

						return (
							<div>
								<b>Error {user?._id ? 'Updating' : 'Creating'} Player</b>
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
							label="Player Name"
							placeholder="Enter player name"
						/>
					)}
				</form.AppField>

				<form.AppField name="location">
					{({ Input }) => (
						<Input
							label="Player Location"
							placeholder="Enter player location"
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
				{user?._id ? 'Update Player' : 'Add Player'}
			</Button>
		</form>
	)
}

type UpdatePlayerFormPropsType = {
	user: UserType
}

const UpdatePlayerForm: FC<UpdatePlayerFormPropsType> = PlayerForm
const CreatePlayerForm: FC = PlayerForm

export { CreatePlayerForm, UpdatePlayerForm }
