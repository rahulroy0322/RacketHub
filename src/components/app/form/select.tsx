import type { FC, ReactNode } from 'react'
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FormBase, type FormControllPropsType } from './base'
import { useFieldContext } from './main'

type FormSelectPropsType = FormControllPropsType & {
	placeholder: string
} & Parameters<typeof Select>[0] & {
		children: ReactNode
	}

const FormSelect: FC<FormSelectPropsType> = ({
	label,
	description,
	placeholder,
	children,
	...props
}) => {
	const field = useFieldContext<string>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<FormBase
			description={description}
			label={label}
		>
			<Select
				onValueChange={field.handleChange}
				value={field.state.value}
				{...props}
			>
				<SelectTrigger
					aria-invalid={isInvalid}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent
					aria-invalid={isInvalid}
					id={field.name}
					onBlur={field.handleBlur}
				>
					{children}
				</SelectContent>
			</Select>
		</FormBase>
	)
}

export { FormSelect }
