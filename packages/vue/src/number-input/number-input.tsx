import type { Context } from '@zag-js/number-input'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput } from './use-number-input'

export type NumberInputContext = Context & { modelValue?: Context['value'] }
export type UseNumberInputProps = Assign<HTMLArkProps<'div'>, NumberInputContext>

const VueNumberInputProps = createVueProps<UseNumberInputProps>({
  id: {
    type: String as PropType<UseNumberInputProps['id']>,
  },
  allowMouseWheel: {
    type: Boolean as PropType<UseNumberInputProps['allowMouseWheel']>,
  },
  allowOverflow: {
    type: Boolean as PropType<UseNumberInputProps['allowOverflow']>,
  },
  clampValueOnBlur: {
    type: Boolean as PropType<UseNumberInputProps['clampValueOnBlur']>,
    default: true,
  },
  dir: {
    type: String as PropType<UseNumberInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseNumberInputProps['disabled']>,
  },
  focusInputOnChange: {
    type: Boolean as PropType<UseNumberInputProps['focusInputOnChange']>,
  },
  form: {
    type: String as PropType<UseNumberInputProps['form']>,
  },
  format: {
    type: Function as PropType<UseNumberInputProps['format']>,
  },
  getRootNode: {
    type: Function as PropType<UseNumberInputProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<UseNumberInputProps['ids']>,
  },
  inputMode: {
    type: String as PropType<UseNumberInputProps['inputMode']>,
  },
  invalid: {
    type: Boolean as PropType<UseNumberInputProps['invalid']>,
  },
  max: {
    type: Number as PropType<UseNumberInputProps['max']>,
  },
  maxFractionDigits: {
    type: Number as PropType<UseNumberInputProps['maxFractionDigits']>,
  },
  min: {
    type: Number as PropType<UseNumberInputProps['min']>,
  },
  minFractionDigits: {
    type: Number as PropType<UseNumberInputProps['minFractionDigits']>,
  },
  modelValue: {
    type: String as PropType<UseNumberInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseNumberInputProps['name']>,
  },
  parse: {
    type: Function as PropType<UseNumberInputProps['parse']>,
  },
  pattern: {
    type: String as PropType<UseNumberInputProps['pattern']>,
  },
  readOnly: {
    type: Boolean as PropType<UseNumberInputProps['readOnly']>,
  },
  spinOnPress: {
    type: Boolean as PropType<UseNumberInputProps['spinOnPress']>,
  },
  step: {
    type: Number as PropType<UseNumberInputProps['step']>,
  },
  translations: {
    type: Object as PropType<UseNumberInputProps['translations']>,
  },
  validateCharacter: {
    type: Function as PropType<UseNumberInputProps['validateCharacter']>,
  },
  value: {
    type: String as PropType<UseNumberInputProps['value']>,
  },
})

export const NumberInput: ComponentWithProps<Partial<UseNumberInputProps>> = defineComponent({
  name: 'NumberInput',
  emits: ['change', 'focus', 'invalid', 'blur', 'update:modelValue'],
  props: VueNumberInputProps,
  setup(props, { slots, emit }) {
    const api = useNumberInput(emit, props)

    NumberInputProvider(api)

    return () => <ark.div>{() => slots?.default?.(api.value)}</ark.div>
  },
})

export type NumberInputProps = Optional<NumberInputContext, 'id'>
