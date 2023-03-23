import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { ComboboxProvider } from './combobox-context'
import { useCombobox, type UseComboboxProps } from './use-combobox'

type UseComboboxPropsContext = UseComboboxProps['context']

export type ComboboxProps = Assign<HTMLArkProps<'div'>, UseComboboxPropsContext> & {
  defaultValue?: UseComboboxProps['defaultValue']
}

const VueComboboxProps = {
  modelValue: {
    type: String as PropType<ComboboxProps['modelValue']>,
  },
  allowCustomValue: {
    type: Boolean as PropType<ComboboxProps['allowCustomValue']>,
  },
  ariaHidden: {
    type: Boolean as PropType<ComboboxProps['ariaHidden']>,
  },
  autoFocus: {
    type: Boolean as PropType<ComboboxProps['autoFocus']>,
  },
  blurOnSelect: {
    type: Boolean as PropType<ComboboxProps['blurOnSelect']>,
  },
  dir: {
    type: String as PropType<ComboboxProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<ComboboxProps['disabled']>,
  },
  defaultValue: {
    type: String as PropType<ComboboxProps['defaultValue']>,
  },
  focusOnClear: {
    type: Boolean as PropType<ComboboxProps['focusOnClear']>,
  },
  form: {
    type: String as PropType<ComboboxProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<ComboboxProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<ComboboxProps['ids']>,
  },
  inputBehavior: {
    type: String as PropType<ComboboxProps['inputBehavior']>,
  },
  invalid: {
    type: Boolean as PropType<ComboboxProps['invalid']>,
  },
  isCustomValue: {
    type: Function as PropType<ComboboxProps['isCustomValue']>,
  },
  loop: {
    type: Boolean as PropType<ComboboxProps['loop']>,
  },
  name: {
    type: String as PropType<ComboboxProps['name']>,
  },
  openOnClick: {
    type: Boolean as PropType<ComboboxProps['openOnClick']>,
  },
  placeholder: {
    type: String as PropType<ComboboxProps['placeholder']>,
  },
  positioning: {
    type: String as PropType<ComboboxProps['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<ComboboxProps['readOnly']>,
  },
  selectInputOnfocus: {
    type: Boolean as PropType<ComboboxProps['selectInputOnFocus']>,
  },
  selectOnTab: {
    type: Boolean as PropType<ComboboxProps['selectOnTab']>,
  },
  selectionBehavior: {
    type: String as PropType<ComboboxProps['selectionBehavior']>,
  },
  selectionData: {
    type: Object as PropType<ComboboxProps['selectionData']>,
  },
  translations: {
    type: Object as PropType<ComboboxProps['translations']>,
  },
}

export const Combobox: ComponentWithProps<ComboboxProps> = defineComponent({
  name: 'Combobox',
  props: VueComboboxProps,
  emits: ['close', 'open', 'highlight', 'input-change', 'update:modelValue', 'select'],
  setup(props, { slots, attrs, emit, expose }) {
    const comboboxProps = computed<UseComboboxProps>(() => ({
      context: props,
      defaultValue: props.modelValue ?? props.defaultValue,
      emit,
    }))

    const api = useCombobox(comboboxProps.value)

    ComboboxProvider(api)

    expose({ ...api.value })

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots.default?.()}
      </ark.div>
    )
  },
})
