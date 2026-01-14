import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
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

type DataTablePropsType<T> = {
	data: T[]
	columns: ColumnDef<T>[]
}

const DataTable = <T,>({ data, columns }: DataTablePropsType<T>): ReactNode => {
	const id = useId()

	const [sorting, onSortingChange] = useState<SortingState>([])
	const [globalFilter, onGlobalFilterChange] = useState('')
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange,
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange,
		state: {
			sorting,
			globalFilter,
		},

		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 50,
			},
		},
	})

	return (
		<>
			<div className="flex gap-2 items-center justify-between ">
				<Input
					className="max-w-sm"
					onChange={(e) => onGlobalFilterChange(e.target.value)}
					placeholder="Search..."
					value={globalFilter}
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Show Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										checked={column.getIsVisible()}
										className="capitalize"
										key={column.id}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
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
										: flexRender(
												head.column.columnDef.header,
												head.getContext()
											)}
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

			<div className="flex flex-col gap-4 md:flex-row justify-between w-full md:items-center">
				<p className="text-muted-foreground ">
					Select <span>{table.getFilteredSelectedRowModel().rows.length}</span>{' '}
					of <span>{table.getFilteredRowModel().rows.length} row(s)</span>
				</p>

				<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
					<div className="flex gap-1">
						<Label
							className="text-sm font-medium"
							htmlFor={id}
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
								id={id}
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
		</>
	)
}

export { DataTable }
