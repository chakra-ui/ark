import { type Context } from '@zag-js/editable'
import { defineComponent, type PropType } from 'vue'
import { ark } from '../factory'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { EditableProvider } from './editable-context'
import { useEditable } from './use-editable'

export type UseEditableProps = Context & { modelValue?: Context['value'] }

const VueEditableProps = createVueProps<UseEditableProps>({
  activationMode: {
    type: String as PropType<UseEditableProps['activationMode']>,
  },
  autoResize: {
    type: Boolean as PropType<UseEditableProps['autoResize']>,
  },
  dir: {
    type: String as PropType<UseEditableProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseEditableProps['disabled']>,
  },
  form: {
    type: String as PropType<UseEditableProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseEditableProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseEditableProps['id']>,
  },
  ids: {
    type: Object as PropType<UseEditableProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<UseEditableProps['invalid']>,
  },
  maxLength: {
    type: Number as PropType<UseEditableProps['maxLength']>,
  },
  modelValue: {
    type: String as PropType<UseEditableProps['value']>,
  },
  name: {
    type: String as PropType<UseEditableProps['name']>,
  },
  placeholder: {
    type: String as PropType<UseEditableProps['placeholder']>,
  },
  readOnly: {
    type: Boolean as PropType<UseEditableProps['readOnly']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<UseEditableProps['selectOnFocus']>,
  },
  startWithEditView: {
    type: Boolean as PropType<UseEditableProps['startWithEditView']>,
  },
  submitMode: {
    type: String as PropType<UseEditableProps['submitMode']>,
  },
  translations: {
    type: Object as PropType<UseEditableProps['translations']>,
  },
  value: {
    type: String as PropType<UseEditableProps['value']>,
  },
})

export const Editable: ComponentWithProps<Partial<UseEditableProps>> = defineComponent({
  name: 'Editable',
  props: VueEditableProps,
  emits: ['cancel', 'change', 'update:modelValue', 'edit', 'submit'],
  setup(props, { slots, attrs, emit }) {
    const api = useEditable(emit, props as UseEditableProps)

    EditableProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.div>
    )
  },
})

export type EditableProps = Optional<UseEditableProps, 'id'>
