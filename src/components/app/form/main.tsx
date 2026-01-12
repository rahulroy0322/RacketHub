import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './input'
import { FormMultiSelect } from './multi-select'
import { FormSelect } from './select'
import { FormTextArea } from './text-area'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: FormInput,
		Textarea: FormTextArea,
		MultiSelect: FormMultiSelect,
		Select: FormSelect,
		// Checkbox: FormCheckbox,
	},
	formComponents: {},
	fieldContext,
	formContext,
})

export { useAppForm, useFieldContext }
