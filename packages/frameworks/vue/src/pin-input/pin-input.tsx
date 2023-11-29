import { type Context } from '@zag-js/pin-input'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { PinInputProvider } from './pin-input-context'
import { usePinInput } from './use-pin-input'

export type PinInputContext = Context & {
  modelValue?: PinInputContext['value']
}
export type UsePinInputProps = Assign<HTMLArkProps<'div'>, PinInputContext>

const VuePinInputProps = createVueProps<UsePinInputProps>({
  autoFocus: {
    type: Boolean as PropType<UsePinInputProps['autoFocus']>,
  },
  blurOnComplete: {
    type: Boolean as PropType<UsePinInputProps['blurOnComplete']>,
  },
  dir: {
    type: String as PropType<UsePinInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UsePinInputProps['disabled']>,
  },
  form: {
    type: String as PropType<UsePinInputProps['form']>,
  },
  id: {
    type: String as PropType<UsePinInputProps['id']>,
  },
  ids: {
    type: Object as PropType<UsePinInputProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<UsePinInputProps['invalid']>,
  },
  mask: {
    type: Boolean as PropType<UsePinInputProps['mask']>,
  },
  modelValue: {
    type: Array as PropType<UsePinInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<UsePinInputProps['name']>,
  },
  otp: {
    type: Boolean as PropType<UsePinInputProps['otp']>,
  },
  pattern: {
    type: String as PropType<UsePinInputProps['pattern']>,
  },
  placeholder: {
    type: String as PropType<UsePinInputProps['placeholder']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<UsePinInputProps['selectOnFocus']>,
  },
  translations: {
    type: Object as PropType<UsePinInputProps['translations']>,
  },
  type: {
    type: String as PropType<UsePinInputProps['type']>,
  },
  value: {
    type: Array as PropType<UsePinInputProps['value']>,
  },
})

export const PinInput: ComponentWithProps<Partial<UsePinInputProps>> = defineComponent({
  name: 'PinInput',
  props: VuePinInputProps,
  emits: ['change', 'update:modelValue', 'invalid', 'complete'],
  setup(props, { slots, attrs, emit }) {
    const api = usePinInput(emit, props)

    PinInputProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})

export type PinInputProps = Optional<PinInputContext, 'id'>
