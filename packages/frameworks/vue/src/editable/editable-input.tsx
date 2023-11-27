import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLArkProps<'input'>

export const EditableInput = defineComponent({
  name: 'EditableInput',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.value,
    }))

    return () => (
      <ark.input {...inputProps.value} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
})
