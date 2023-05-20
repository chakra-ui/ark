/* eslint-disable vue/no-reserved-component-names */

import type { Context } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { SelectProvider } from './select-context'
import { useSelect } from './use-select'

export type SelectContext = Context & {
  modelValue?: Context['selectedOption']
}

export type UseSelectProps = SelectContext

const VueSelectProps = createVueProps<UseSelectProps>({
  id: {
    type: String as PropType<UseSelectProps['id']>,
  },
  modelValue: {
    type: [Object, null] as PropType<UseSelectProps['modelValue']>,
  },
  loop: {
    type: Boolean as PropType<UseSelectProps['loop']>,
    default: false,
  },
  closeOnSelect: {
    type: Boolean as PropType<UseSelectProps['closeOnSelect']>,
    default: true,
  },
  disabled: {
    type: Boolean as PropType<UseSelectProps['disabled']>,
    default: false,
  },
  readOnly: {
    type: Boolean as PropType<UseSelectProps['readOnly']>,
    default: false,
  },
  name: {
    type: String as PropType<UseSelectProps['name']>,
  },
  invalid: {
    type: Boolean as PropType<UseSelectProps['invalid']>,
  },
  form: {
    type: String as PropType<UseSelectProps['form']>,
  },
  positioning: {
    type: Object as PropType<UseSelectProps['positioning']>,
  },
  highlightedOption: {
    type: Object as PropType<UseSelectProps['highlightedOption']>,
  },
  selectOnTab: {
    type: Boolean as PropType<UseSelectProps['selectOnTab']>,
  },
  selectedOption: {
    type: Object as PropType<UseSelectProps['selectedOption']>,
  },
  dir: {
    type: String as PropType<UseSelectProps['dir']>,
  },
  ids: {
    type: Object as PropType<UseSelectProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<UseSelectProps['getRootNode']>,
  },
})

export const Select: ComponentWithProps<Partial<UseSelectProps>> = defineComponent({
  name: 'Select',
  emits: ['change', 'highlight', 'open', 'close', 'update:modelValue'],
  props: VueSelectProps,
  setup(props, { slots, emit }) {
    const api = useSelect(emit, props as UseSelectProps)

    SelectProvider(api)

    return () => slots?.default?.(api.value)
  },
})

export type SelectProps = Optional<SelectContext, 'id'>
