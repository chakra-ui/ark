import {
  ComponentObjectPropsOptions,
  computed,
  defineComponent,
  PropType,
  reactive,
  watchEffect,
} from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { EditableProvider } from './editable-context'
import { useEditable, UseEditableProps } from './use-editable'

type UseEditablePropsContext = UseEditableProps['context']

export type EditableProps = Assign<HTMLArkProps<'div'>, UseEditablePropsContext>

const VueEditableProps: ComponentObjectPropsOptions = {
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
}

export const Editable: ComponentWithProps<EditableProps> = defineComponent({
  name: 'Editable',
  props: VueEditableProps,
  emits: ['cancel', 'change', 'update:modelValue', 'edit', 'submit'],
  setup(props, { slots, attrs, emit, expose }) {
    const editableProps = computed<UseEditableProps>(() => ({
      context: props,
      emit,
    }))

    const api = useEditable(editableProps.value)

    EditableProvider(api)

    const exposeApi = reactive({ api: {} })

    watchEffect(() => {
      exposeApi.api = api.value
    })

    expose(exposeApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
