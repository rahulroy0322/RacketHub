import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './input'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: FormInput,
		// Textarea: FormTextarea,
		// Select: FormSelect,
		// Checkbox: FormCheckbox,
	},
	formComponents: {},
	fieldContext,
	formContext,
})

export { useAppForm, useFieldContext }
