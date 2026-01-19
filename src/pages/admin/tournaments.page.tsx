import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import {
	ChevronDown,
	ChevronsUpDown,
	ChevronUp,
	Edit,
	PlusCircle,
	Trash2,
} from 'lucide-react'
import type { FC } from 'react'
import { toast } from 'sonner'
import { DataTable } from '@/components/app/table/main'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { destroyTournament } from '@/data/main'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/admin/tournaments'
import type { TournamentStatusType, TournamentType } from '@/types'

const { useLoaderData } = Route

type DestroyButtonPropsType = {
	id: string
	name: string
}

const DestroyButton: FC<DestroyButtonPropsType> = ({ name, id }) => {
	const router = useRouter()
	const { isPending, mutate } = useMutation({
		mutationKey: ['tournament', id],
		mutationFn: async () => {
			toast.promise(
				async () => {
					const data = await destroyTournament(id)

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
					loading: `Deleting ${name}...`,
					success: () => {
						router.invalidate({
							sync: true,
						})

						return `Tournament "${name}" Deleted.`
					},
					error: ({ message }: Error) => (
						<div>
							<b>Error :</b>
							<span>{message}</span>
						</div>
					),
				}
			)
		},
	})

	return (
		<Button
			disabled={isPending}
			onClick={mutate as unknown as () => void}
			size={'icon-sm'}
			variant={'destructive'}
		>
			<Trash2 size={15} />
		</Button>
	)
}

const TableBlank: FC = () => (
	<CardContent className="text-center">No Tournaments Were Found</CardContent>
)

type TournamentKeyType = keyof TournamentType

const { format } = Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
})

const columns: ColumnDef<TournamentType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					aria-label="Select all"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					aria-label="Select row"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'name' satisfies TournamentKeyType,
		header: ({ column }) => {
			const sorting = column.getIsSorted()

			const Comp =
				sorting === 'asc'
					? ChevronUp
					: sorting === 'desc'
						? ChevronDown
						: ChevronsUpDown

			return (
				<Button
					className="bg-transparent!"
					onClick={column.getToggleSortingHandler()}
					variant="ghost"
				>
					Name <Comp className="size-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('name' satisfies TournamentKeyType)}
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},

	{
		accessorKey: 'status' satisfies TournamentKeyType,
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const status: TournamentStatusType = row.getValue(
				'status' satisfies TournamentKeyType
			)
			return (
				<div className="flex items-center justify-center">
					<Badge
						className={cn({
							'bg-green-500': status === 'completed',
						})}
						variant={
							status === 'live'
								? 'default'
								: status === 'upcoming'
									? 'outline'
									: 'destructive'
						}
					>
						{status}
					</Badge>
				</div>
			)
		},
		enableSorting: false,
	},

	{
		accessorKey: 'location' satisfies TournamentKeyType,
		header: () => <div className="text-center">Location</div>,
		cell: ({ row }) => {
			const location: TournamentStatusType = row.getValue(
				'location' satisfies TournamentKeyType
			)
			return <div className="text-center">{location || 'No Location'}</div>
		},
		enableSorting: false,
	},

	{
		accessorKey: 'startDate' satisfies TournamentKeyType,
		header: () => <div className="text-center">Date</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{format(
					new Date(row.getValue('startDate' satisfies TournamentKeyType))
				)}
			</div>
		),
		enableSorting: true,
	},

	{
		accessorKey: 'teams' satisfies TournamentKeyType,
		header: () => <div className="text-center">Teams</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{(row.getValue('teams' satisfies TournamentKeyType) as []).length ??
					'No Teams'}
			</div>
		),
		enableSorting: true,
	},
	{
		id: 'actions',
		header: () => <div className="text-center">Actions</div>,
		cell: ({ row }) => {
			const { _id: id, name } = row.original

			return (
				<div className="flex gap-2 justify-center items-center">
					<Link to="/">
						<Edit size={15} />
					</Link>

					<Link
						params={{
							id,
						}}
						to="/admin/$id/match"
					>
						<PlusCircle size={15} />
					</Link>
					<DestroyButton
						id={id}
						name={name}
					/>
				</div>
			)
		},
		enableSorting: false,
		enableHiding: false,
	},
]

const TournamentsPage: FC = () => {
	const tournaments = useLoaderData()

	return (
		<div className="overflow-hidden absolute inset-0 p-2">
			<Card className="max-h-full">
				<CardHeader>
					<CardTitle>Tournaments</CardTitle>
					<CardDescription>Menage All the Tournaments</CardDescription>
				</CardHeader>
				{!tournaments.length ? (
					<TableBlank />
				) : (
					<CardContent className="grow overflow-auto flex flex-col gap-2">
						<DataTable
							columns={columns}
							data={tournaments}
						/>
					</CardContent>
				)}
			</Card>
		</div>
	)
}

export { TournamentsPage }
