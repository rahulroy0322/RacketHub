import type { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { FormBase, type FormControllPropsType } from './base'
import { useFieldContext } from './main'

type FormTextAreaPropsType = FormControllPropsType &
	Parameters<typeof Textarea>[0]

const FormTextArea: FC<FormTextAreaPropsType> = ({
	label,
	description,
	...props
}) => {
	const field = useFieldContext<string>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<FormBase
			description={description}
			label={label}
		>
			<Textarea
				{...props}
				aria-invalid={isInvalid}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				value={field.state.value}
			/>
		</FormBase>
	)
}

export { FormTextArea }
