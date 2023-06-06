import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput, type UseNumberInputContext } from './use-number-input'

export type NumberInputProps = Assign<HTMLArkProps<'div'>, UseNumberInputContext>

const VueNumberInputProps = createVueProps<NumberInputProps>({
  id: {
    type: String as PropType<NumberInputProps['id']>,
  },
  allowMouseWheel: {
    type: Boolean as PropType<NumberInputProps['allowMouseWheel']>,
  },
  allowOverflow: {
    type: Boolean as PropType<NumberInputProps['allowOverflow']>,
  },
  clampValueOnBlur: {
    type: Boolean as PropType<NumberInputProps['clampValueOnBlur']>,
    default: true,
  },
  dir: {
    type: String as PropType<NumberInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<NumberInputProps['disabled']>,
  },
  focusInputOnChange: {
    type: Boolean as PropType<NumberInputProps['focusInputOnChange']>,
  },
  form: {
    type: String as PropType<NumberInputProps['form']>,
  },
  format: {
    type: Function as PropType<NumberInputProps['format']>,
  },
  getRootNode: {
    type: Function as PropType<NumberInputProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<NumberInputProps['ids']>,
  },
  inputMode: {
    type: String as PropType<NumberInputProps['inputMode']>,
  },
  invalid: {
    type: Boolean as PropType<NumberInputProps['invalid']>,
  },
  max: {
    type: Number as PropType<NumberInputProps['max']>,
  },
  maxFractionDigits: {
    type: Number as PropType<NumberInputProps['maxFractionDigits']>,
  },
  min: {
    type: Number as PropType<NumberInputProps['min']>,
  },
  minFractionDigits: {
    type: Number as PropType<NumberInputProps['minFractionDigits']>,
  },
  modelValue: {
    type: String as PropType<NumberInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<NumberInputProps['name']>,
  },
  parse: {
    type: Function as PropType<NumberInputProps['parse']>,
  },
  pattern: {
    type: String as PropType<NumberInputProps['pattern']>,
  },
  readOnly: {
    type: Boolean as PropType<NumberInputProps['readOnly']>,
  },
  spinOnPress: {
    type: Boolean as PropType<NumberInputProps['spinOnPress']>,
  },
  step: {
    type: Number as PropType<NumberInputProps['step']>,
  },
  translations: {
    type: Object as PropType<NumberInputProps['translations']>,
  },
  validateCharacter: {
    type: Function as PropType<NumberInputProps['validateCharacter']>,
  },
  value: {
    type: String as PropType<NumberInputProps['value']>,
  },
  defaultValue: {
    type: String as PropType<NumberInputProps['defaultValue']>,
  },
})

export const NumberInput: ComponentWithProps<Partial<NumberInputProps>> = defineComponent({
  name: 'NumberInput',
  emits: ['change', 'focus', 'invalid', 'blur', 'update:modelValue'],
  props: VueNumberInputProps,
  setup(props, { slots, emit }) {
    const api = useNumberInput(emit, props)

    NumberInputProvider(api)

    return () => <ark.div>{() => slots?.default?.(api.value)}</ark.div>
  },
})
