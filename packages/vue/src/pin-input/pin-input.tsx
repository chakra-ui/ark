import { computed, defineComponent, type ComponentPropsOptions, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

type UsePinInputPropsContext = UsePinInputProps['context']

export type PinInputProps = Assign<HTMLArkProps<'div'>, UsePinInputPropsContext>

const VuePinInputProps: ComponentPropsOptions = {
  autoFocus: {
    type: Boolean as PropType<PinInputProps['autoFocus']>,
  },
  blurOnComplete: {
    type: Boolean as PropType<PinInputProps['blurOnComplete']>,
  },
  dir: {
    type: String as PropType<PinInputProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<PinInputProps['disabled']>,
  },
  form: {
    type: String as PropType<PinInputProps['form']>,
  },
  id: {
    type: String as PropType<PinInputProps['id']>,
  },
  ids: {
    type: Object as PropType<PinInputProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<PinInputProps['invalid']>,
  },
  mask: {
    type: Boolean as PropType<PinInputProps['mask']>,
  },
  modelValue: {
    type: Array as PropType<PinInputProps['modelValue']>,
  },
  name: {
    type: String as PropType<PinInputProps['name']>,
  },
  otp: {
    type: Boolean as PropType<PinInputProps['otp']>,
  },
  pattern: {
    type: String as PropType<PinInputProps['pattern']>,
  },
  placeholder: {
    type: String as PropType<PinInputProps['placeholder']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<PinInputProps['selectOnFocus']>,
  },
  translations: {
    type: Object as PropType<PinInputProps['translations']>,
  },
  type: {
    type: String as PropType<PinInputProps['type']>,
  },
  value: {
    type: Array as PropType<PinInputProps['value']>,
  },
}

export const PinInput: ComponentWithProps<PinInputProps> = defineComponent({
  name: 'PinInput',
  props: VuePinInputProps,
  emits: ['change', 'update:modelValue', 'invalid', 'complete'],
  setup(props, { slots, attrs, emit }) {
    const pinInputProps = computed<UsePinInputProps>(() => ({
      context: props,
      emit,
    }))

    const api = usePinInput(pinInputProps.value)

    PinInputProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
