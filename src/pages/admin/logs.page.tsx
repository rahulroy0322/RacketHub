import type { FilterFn } from '@tanstack/react-table'
import {
	type ColumnDef,
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { isAfter, isBefore } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import { type FC, useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import {
	DataTable,
	DataTableColumnHeader,
	DataTableFooter,
} from '@/components/app/data-table'
import {
	LogsSearch,
	LogsSelects,
	LogsTableFilter,
} from '@/components/app/logs/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/admin/logs'
import type { LogType } from '@/types'

const { useLoaderData } = Route

type LogKeyType = keyof LogType

type RenderValuePropsType = {
	value: unknown
}

const RenderValue: FC<RenderValuePropsType> = ({ value }) => {
	if (Array.isArray(value)) {
		return JSON.stringify(value)
	}

	if (typeof value === 'object') {
		return (
			<div className="grid grid-cols-2 gap-0.5 *:border *:border-rose-600">
				{Object.entries(value || {}).map(([key, value]) => (
					<>
						<span>{key}</span>
						<span>
							{typeof value === 'string' ? value : JSON.stringify(value)}
						</span>
					</>
				))}
			</div>
		)
	}

	return value as string
}

// // Extend the FilterFns interface to include your custom filter
// declare module '@tanstack/react-table' {
// 	interface FilterFns {
// 		inDateRange?: FilterFn<unknown>
// 	}
// }

const inDateRange: FilterFn<unknown> = (
	row,
	columnId,
	filterValue: DateRange | undefined
): boolean => {
	const rowDate = new Date(row.getValue(columnId))
	if (filterValue) {
		const { to, from } = filterValue

		if (!to && from) {
			return isAfter(rowDate, from)
		}

		if (from && to) {
			return isAfter(rowDate, from) && isBefore(rowDate, to)
		}
	}
	return true
}

const { format } = Intl.DateTimeFormat(undefined, {
	dateStyle: 'short',
	timeStyle: 'short',
})

const columns: ColumnDef<LogType>[] = [
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
		accessorKey: 'time' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="When?"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{format(new Date(row.getValue('time' satisfies LogKeyType)))}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
		filterFn: 'inDateRange' as 'weakEquals',
	},

	{
		accessorKey: 'reqId' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Request Id"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('reqId' satisfies LogKeyType)}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'appName' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="App Name"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('appName' satisfies LogKeyType)}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'level' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Log Level"
			/>
		),
		cell: ({ row }) => {
			const status: LogType['level'] = row.getValue(
				'level' satisfies LogKeyType
			)
			return (
				<div className="flex items-center justify-center">
					<Badge
						className={cn({
							'bg-violet-500': status === 'debug',
							'bg-green-500': status === 'info',
							'bg-yellow-500': status === 'warn',
							'bg-rose-500': status === 'error',
							'bg-red-600': status === 'fatal',
						})}
					>
						{status}
					</Badge>
				</div>
			)
		},
		enableSorting: false,
		enableHiding: true,
	},

	{
		accessorKey: 'processId' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Node Id"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('processId' satisfies LogKeyType)}
			</div>
		),
		enableSorting: false,
		enableHiding: true,
	},

	{
		accessorKey: 'url' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Url"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('url' satisfies LogKeyType) ?? (
					<Badge
						variant={
							(row.getValue(
								'level' satisfies LogKeyType
							) as LogType['level']) === 'error'
								? 'destructive'
								: 'default'
						}
					>
						Internal Message
					</Badge>
				)}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'msg' satisfies LogKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-start"
				column={column}
				title="Message"
			/>
		),
		cell: ({ row }) => (
			<div className="line-clamp-1">
				{row.getValue('msg' satisfies LogKeyType)}
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		id: 'actions',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Actions"
			/>
		),
		cell: ({ row: { original } }) => (
			<div className="flex items-center justify-end">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							size="sm"
							variant="outline"
						>
							<MoreHorizontal />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align="end"
						className="w-[calc(75vw)] max-w-4xl max-h-96 overflow-hidden flex flex-col gap-1 shadow-2xl shadow-primary"
					>
						<h3 className="text-2xl font-extrabold">Details</h3>

						<div className="grid grid-cols-3 grow overflow-hidden overflow-y-auto relative  *:border *:border-blue-600 *:px-0.5">
							<b className="sticky top-0 bg-card">Field</b>
							<b className="col-span-2 sticky top-0 bg-card">Value</b>

							{Object.entries(original).map(([key, value]) => (
								<>
									<span>{key}</span>
									<span className="col-span-2">
										<RenderValue value={value} />
									</span>
								</>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
]

const LogsDashBoardPage: FC = () => {
	const { logs: data } = useLoaderData()

	const apps = useMemo((): string[] => {
		const set = new Set<string>(data.map(({ appName }) => appName))
		return [...set]
	}, [data])

	const nodes = useMemo((): string[] => {
		const set = new Set<string>(data.map(({ processId }) => `${processId}`))
		return [...set]
	}, [data])

	const [sorting, onSortingChange] = useState<SortingState>([])
	const [globalFilter, onGlobalFilterChange] = useState('')
	const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>(
		[]
	)

	const table = useReactTable<LogType>({
		data,
		columns,
		enableRowSelection: (row) => !!row.original._id,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange,
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange,
		state: {
			sorting,
			globalFilter,
			columnFilters,
		},
		filterFns: {
			inDateRange,
		},
		onColumnFiltersChange,
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 50,
			},
		},
	})

	return (
		<div className="p-4 absolute inset-0 overflow-hidden">
			<Card className="flex flex-col h-full w-full">
				<CardHeader>
					<div className="grid gap-2 md:grid-cols-4 lg:grid-cols-8 items-start lg:items-end">
						<LogsSelects
							apps={apps}
							nodes={nodes}
							table={table}
						/>

						<LogsSearch
							globalFilter={globalFilter}
							onGlobalFilterChange={onGlobalFilterChange}
							table={table}
						/>

						<LogsTableFilter table={table} />
					</div>
				</CardHeader>
				<CardContent className="grow overflow-auto relative">
					<DataTable table={table} />
				</CardContent>
				<CardFooter>
					<DataTableFooter table={table} />
				</CardFooter>
			</Card>
		</div>
	)
}

export { LogsDashBoardPage }
