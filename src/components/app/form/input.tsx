import type { ComponentProps, FC } from 'react'
import { Input } from '@/components/ui/input'
import { FormBase, type FormControllPropsType } from './base'
import { useFieldContext } from './main'

type FormInputPropsType = FormControllPropsType & ComponentProps<'input'>

const FormInput: FC<FormInputPropsType> = ({
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
			<Input
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

export { FormInput }
