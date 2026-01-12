import type { FC } from 'react'
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectTrigger,
	MultiSelectValue,
} from '@/components/ui/multi-select'
import { FormBase, type FormControllPropsType } from './base'
import { useFieldContext } from './main'

type FormMultiSelectPropsType = FormControllPropsType & {
	placeholder: string
} & Omit<
		Parameters<typeof MultiSelectContent>[0],
		'onBlur' | 'id' | 'aria-invalid' | 'placeholder'
	>

const FormMultiSelect: FC<FormMultiSelectPropsType> = ({
	label,
	description,
	placeholder,
	...props
}) => {
	const field = useFieldContext<string[]>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<FormBase
			description={description}
			label={label}
		>
			<MultiSelect
				onValuesChange={field.handleChange}
				values={field.state.value}
			>
				<MultiSelectTrigger
					aria-invalid={isInvalid}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
				>
					<MultiSelectValue placeholder={placeholder} />
				</MultiSelectTrigger>
				<MultiSelectContent
					aria-invalid={isInvalid}
					id={field.name}
					onBlur={field.handleBlur}
					{...props}
				/>
			</MultiSelect>
		</FormBase>
	)
}

export { FormMultiSelect }
