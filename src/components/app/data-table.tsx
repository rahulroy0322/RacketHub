'use no memo'
import {
	type Column,
	flexRender,
	type Table as ReactTable,
} from '@tanstack/react-table'
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUpDown,
	ChevronUp,
	Funnel,
} from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type DataTablePropsType<T extends Record<string, unknown>> = {
	table: ReactTable<T>
}

const DataTable = <T extends Record<string, unknown>>({
	table,
}: DataTablePropsType<T>): ReactNode => (
	<Table>
		<TableHeader className="sticky top-0 left-0 z-50 bg-background">
			{table.getHeaderGroups().map((header) => (
				<TableRow key={header.id}>
					{header.headers.map((head) => (
						<TableHead
							colSpan={head.colSpan}
							key={head.id}
						>
							{head.isPlaceholder
								? null
								: flexRender(head.column.columnDef.header, head.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
		<TableBody>
			{table.getRowModel().rows.map((row) => (
				<TableRow key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	</Table>
)

const DataTableFooter = <T extends Record<string, unknown>>({
	table,
}: Pick<DataTablePropsType<T>, 'table'>): ReactNode => (
	<div className="flex flex-col gap-4 md:flex-row justify-between w-full md:items-center">
		<p className="text-muted-foreground text-sm">
			Select <span>{table.getFilteredSelectedRowModel().rows.length}</span> of{' '}
			<span>{table.getFilteredRowModel().rows.length} row(s)</span>
		</p>

		<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
			<div className="flex gap-1">
				<Label
					className="text-sm font-medium"
					htmlFor={'page'}
				>
					Rows per page
				</Label>

				<Select
					onValueChange={(value) => {
						table.setPageSize(Number(value))
					}}
					value={`${table.getState().pagination.pageSize}`}
				>
					<SelectTrigger
						className="w-20"
						id={'page'}
						size="sm"
					>
						<SelectValue placeholder={'Select Rows'} />
					</SelectTrigger>
					<SelectContent side="top">
						{[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
							<SelectItem
								key={pageSize}
								value={`${pageSize}`}
							>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex gap-1">
				<p>
					Page <span>{table.getState().pagination.pageIndex + 1}</span> of{' '}
					<span>{table.getPageCount()}</span>
				</p>

				<Button
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.setPageIndex(0)}
					size={'icon-sm'}
					variant="outline"
				>
					<ChevronsLeft />
				</Button>

				<Button
					disabled={!table.getCanPreviousPage()}
					onClick={table.nextPage}
					size={'icon-sm'}
					variant="outline"
				>
					<ChevronLeft />
				</Button>

				<Button
					disabled={!table.getCanNextPage()}
					onClick={table.nextPage}
					size={'icon-sm'}
					variant="outline"
				>
					<ChevronRight />
				</Button>

				<Button
					disabled={!table.getCanNextPage()}
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					size={'icon-sm'}
					variant="outline"
				>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	</div>
)

type DataTableColumnHeaderProps<TData, TValue> = {
	column: Column<TData, TValue>
	title: string
} & HTMLAttributes<HTMLDivElement>

const DataTableColumnHeader = <TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>): ReactNode => {
	if (!column.getCanSort()) {
		return <div className={cn('text-center', className)}>{title}</div>
	}

	const sorting = column.getIsSorted()

	const Comp =
		sorting === 'asc'
			? ChevronUp
			: sorting === 'desc'
				? ChevronDown
				: ChevronsUpDown

	return (
		<Button
			className={cn('bg-transparent! w-full', className)}
			onClick={column.getToggleSortingHandler()}
			variant="ghost"
		>
			<span>{title}</span> <Comp className="size-4" />
		</Button>
	)
}

type DataTableHeadersFilterPropsType<T extends Record<string, unknown>> = {
	table: ReactTable<T>
}

const DataTableHeadersFilter = <T extends Record<string, unknown>>({
	table,
}: DataTableHeadersFilterPropsType<T>): ReactNode => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline">
				Columns <Funnel className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Show the fields</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{table
				.getAllColumns()
				.filter((column) => column.getCanHide())
				.map((column) => {
					return (
						<DropdownMenuCheckboxItem
							checked={column.getIsVisible()}
							className="capitalize cursor-pointer hover:"
							key={column.id}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenuCheckboxItem>
					)
				})}
		</DropdownMenuContent>
	</DropdownMenu>
)

export {
	DataTable,
	DataTableFooter,
	DataTableColumnHeader,
	DataTableHeadersFilter,
}
