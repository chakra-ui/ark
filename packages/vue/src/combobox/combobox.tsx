import { type Context } from '@zag-js/combobox'
import { defineComponent, type PropType } from 'vue'
import { ark } from '../factory'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { ComboboxProvider } from './combobox-context'
import { useCombobox } from './use-combobox'

export type ComboboxContext = Context & {
  modelValue?: ComboboxContext['inputValue']
}
export type UseComboboxProps = ComboboxContext

const VueComboboxProps = createVueProps<UseComboboxProps>({
  id: {
    type: String as PropType<UseComboboxProps['id']>,
  },
  modelValue: {
    type: String as PropType<UseComboboxProps['modelValue']>,
  },
  allowCustomValue: {
    type: Boolean as PropType<UseComboboxProps['allowCustomValue']>,
  },
  ariaHidden: {
    type: Boolean as PropType<UseComboboxProps['ariaHidden']>,
  },
  autoFocus: {
    type: Boolean as PropType<UseComboboxProps['autoFocus']>,
  },
  blurOnSelect: {
    type: Boolean as PropType<UseComboboxProps['blurOnSelect']>,
  },
  dir: {
    type: String as PropType<UseComboboxProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseComboboxProps['disabled']>,
  },
  focusOnClear: {
    type: Boolean as PropType<UseComboboxProps['focusOnClear']>,
  },
  form: {
    type: String as PropType<UseComboboxProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseComboboxProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<UseComboboxProps['ids']>,
  },
  inputBehavior: {
    type: String as PropType<UseComboboxProps['inputBehavior']>,
  },
  inputValue: {
    type: String as PropType<UseComboboxProps['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<UseComboboxProps['invalid']>,
  },
  isCustomValue: {
    type: Function as PropType<UseComboboxProps['isCustomValue']>,
  },
  loop: {
    type: Boolean as PropType<UseComboboxProps['loop']>,
  },
  name: {
    type: String as PropType<UseComboboxProps['name']>,
  },
  openOnClick: {
    type: Boolean as PropType<UseComboboxProps['openOnClick']>,
  },
  placeholder: {
    type: String as PropType<UseComboboxProps['placeholder']>,
  },
  positioning: {
    type: String as PropType<UseComboboxProps['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<UseComboboxProps['readOnly']>,
  },
  selectInputOnFocus: {
    type: Boolean as PropType<UseComboboxProps['selectInputOnFocus']>,
  },
  selectOnTab: {
    type: Boolean as PropType<UseComboboxProps['selectOnTab']>,
  },
  selectionBehavior: {
    type: String as PropType<UseComboboxProps['selectionBehavior']>,
  },
  selectionData: {
    type: Object as PropType<UseComboboxProps['selectionData']>,
  },
  translations: {
    type: Object as PropType<UseComboboxProps['translations']>,
  },
})

export const Combobox: ComponentWithProps<Partial<UseComboboxProps>> = defineComponent({
  name: 'Combobox',
  props: VueComboboxProps,
  emits: ['close', 'open', 'highlight', 'input-change', 'update:modelValue', 'select'],
  setup(props, { slots, attrs, emit }) {
    const api = useCombobox(emit, props as UseComboboxProps)

    ComboboxProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots.default?.(api.value)}
      </ark.div>
    )
  },
})

export type ComboboxProps = Optional<ComboboxContext, 'id'>
