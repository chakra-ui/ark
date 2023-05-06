import { type Context } from '@zag-js/editable'
import { defineComponent, type PropType } from 'vue'
import { ark } from '../factory'
import { createVueProps, type ComponentWithProps } from '../utils'
import { EditableProvider } from './editable-context'
import { useEditable } from './use-editable'

export type EditableProps = Context & { modelValue?: Context['value'] }

const VueEditableProps = createVueProps<EditableProps>({
  activationMode: {
    type: String as PropType<EditableProps['activationMode']>,
  },
  autoResize: {
    type: Boolean as PropType<EditableProps['autoResize']>,
  },
  dir: {
    type: String as PropType<EditableProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<EditableProps['disabled']>,
  },
  form: {
    type: String as PropType<EditableProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<EditableProps['getRootNode']>,
  },
  id: {
    type: String as PropType<EditableProps['id']>,
  },
  ids: {
    type: Object as PropType<EditableProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<EditableProps['invalid']>,
  },
  maxLength: {
    type: Number as PropType<EditableProps['maxLength']>,
  },
  modelValue: {
    type: String as PropType<EditableProps['value']>,
  },
  name: {
    type: String as PropType<EditableProps['name']>,
  },
  placeholder: {
    type: String as PropType<EditableProps['placeholder']>,
  },
  readOnly: {
    type: Boolean as PropType<EditableProps['readOnly']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<EditableProps['selectOnFocus']>,
  },
  startWithEditView: {
    type: Boolean as PropType<EditableProps['startWithEditView']>,
  },
  submitMode: {
    type: String as PropType<EditableProps['submitMode']>,
  },
  translations: {
    type: Object as PropType<EditableProps['translations']>,
  },
  value: {
    type: String as PropType<EditableProps['value']>,
  },
})

export const Editable: ComponentWithProps<Partial<EditableProps>> = defineComponent({
  name: 'Editable',
  props: VueEditableProps,
  emits: ['cancel', 'change', 'update:modelValue', 'edit', 'submit'],
  setup(props, { slots, attrs, emit }) {
    const api = useEditable(emit, props as EditableProps)

    EditableProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.div>
    )
  },
})
