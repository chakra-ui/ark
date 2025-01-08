import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './qr-code.types'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the qr code when it is first rendered.
   * Use when you do not need to control the state of the qr code.
   */
  defaultValue?: qrcode.Context['value']
  /**
   * Use this prop to control the value of the qr code.
   */
  modelValue?: qrcode.Context['value']
}

export interface UseQrCodeReturn extends ComputedRef<qrcode.Api<PropTypes>> {}

export const useQrCode = (
  props: UseQrCodeProps = {},
  emit?: EmitFn<RootEmits>,
): UseQrCodeReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<qrcode.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(qrcode.machine(context.value), { context })
  return computed(() => qrcode.connect(state.value, send, normalizeProps))
}
