import type { FC, ReactNode } from 'react'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/field'
import { useFieldContext } from './main'

type FormControllPropsType = {
	label: string
	description?: string
}

type FormBasePropsType = FormControllPropsType & {
	children: ReactNode
}

const FormBase: FC<FormBasePropsType> = ({ children, label, description }) => {
	const field = useFieldContext()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<Field data-invalid={isInvalid}>
			<FieldContent>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{description && <FieldDescription>{description}</FieldDescription>}
			</FieldContent>
			{children}
			{!!field.state.meta.errors.length && (
				<FieldError errors={field.state.meta.errors} />
			)}
		</Field>
	)
}

export { FormBase }
export type { FormControllPropsType }
