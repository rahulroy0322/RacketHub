'use no memo'
import type { Table as ReactTable } from '@tanstack/react-table'
import { addDays } from 'date-fns'
import { CalendarIcon, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { LogType } from '@/types'
import { DataTableHeadersFilter } from '../data-table'

// todo!
export function CalendarRange() {
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
		from: new Date(new Date().getFullYear(), 0, 12),
		to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
	})

	return (
		<Card className="mx-auto w-fit p-0">
			<CardContent className="p-0">
				<Calendar
					defaultMonth={dateRange?.from}
					disabled={(date) =>
						date > new Date() || date < new Date('1900-01-01')
					}
					mode="range"
					numberOfMonths={2}
					onSelect={setDateRange}
					selected={dateRange}
				/>
			</CardContent>
		</Card>
	)
}

const levels = ['debug', 'info', 'warn', 'error', 'fatal']

type LogsTableFilterPropsType = {
	table: ReactTable<LogType>
}

const LogsTableFilter: FC<LogsTableFilterPropsType> = ({ table }) => (
	<div className="flex items-center justify-end gap-2">
		{table.getFilteredSelectedRowModel().rows.length ? (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant={'destructive'}>
						<Trash2 />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Delete the selected rows</p>
				</TooltipContent>
			</Tooltip>
		) : null}
		<DataTableHeadersFilter table={table} />
	</div>
)

type LogSelectPropsType = {
	items: string[]
	placeholder: string
	label: string
	tableKey: Extract<keyof LogType, 'appName' | 'level' | 'processId'>
	table: ReactTable<LogType>
}

const LogSelect: FC<LogSelectPropsType> = ({
	label,
	items,
	placeholder,
	table,
	tableKey,
}) => (
	<div className="flex flex-col gap-1">
		<Label>{label}</Label>
		<Select
			onValueChange={(value) => {
				table
					.getColumn(tableKey)
					?.setFilterValue(tableKey === 'processId' ? Number(value) : value)
			}}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem
						key={item}
						value={item}
					>
						{item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
)

type LogsSelectsPropsType = {
	apps: string[]
	nodes: string[]
	table: ReactTable<LogType>
}
const LogsSelects: FC<LogsSelectsPropsType> = ({ apps, nodes, table }) => (
	<div className="grid grid-cols-3 gap-2 md:col-span-4">
		<LogSelect
			items={apps}
			label="App Name"
			placeholder="Select App Name"
			table={table}
			tableKey="appName"
		/>

		<LogSelect
			items={levels}
			label="Log Label"
			placeholder="Select Lavel"
			table={table}
			tableKey="level"
		/>

		<LogSelect
			items={nodes}
			label="Server Node"
			placeholder="Select Node"
			table={table}
			tableKey="processId"
		/>
	</div>
)

type LogsSearchFormPropsType = {
	globalFilter: string
	onGlobalFilterChange: (value: string) => void
}

const LogsSearchForm: FC<LogsSearchFormPropsType> = ({
	globalFilter,
	onGlobalFilterChange,
}) => (
	<form
		className="grid grid-cols-3 gap-2 items-end"
		onSubmit={(e) => {
			e.preventDefault()
		}}
	>
		<div className="col-span-2 flex flex-col gap-2">
			<Label>Search</Label>

			<Input
				onChange={(e) => {
					onGlobalFilterChange(e.target.value)
				}}
				placeholder="Search..."
				required
				value={globalFilter}
			/>
		</div>

		<Button
			disabled={!globalFilter}
			title="click to fetch form api"
		>
			Search
		</Button>
	</form>
)

const { format } = Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
})

const Trigger: FC<{ date: DateRange | undefined }> = ({ date }) => {
	if (!date) {
		return <span>Pick a date</span>
	}
	if (!date.to) {
		return format(date.from)
	}
	return `${format(date.from)} - ${format(date.to)}`
}

type LogsDateTimeInputPropsType = {
	table: ReactTable<LogType>
}

const now = new Date()

const LogsDateTimeInput: FC<LogsDateTimeInputPropsType> = ({ table }) => {
	const date = table.getColumn('time')?.getFilterValue() as
		| DateRange
		| undefined
	const setDate = (value: DateRange | undefined) => {
		table.getColumn('time')?.setFilterValue(value)
	}

	return (
		<div className="flex flex-col gap-2">
			<Label>Date Range</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button>
						<CalendarIcon />
						<Trigger date={date} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						defaultMonth={now}
						mode="range"
						numberOfMonths={1}
						onSelect={setDate}
						selected={date}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

const LogsSearch: FC<
	LogsSearchFormPropsType & {
		table: ReactTable<LogType>
	}
> = ({ table, ...props }) => (
	<div className="grid gap-2 md:grid-cols-2 items-start md:col-span-3">
		<LogsDateTimeInput table={table} />
		<LogsSearchForm {...props} />
	</div>
)

export { LogsSelects, LogsSearch, LogsTableFilter }
