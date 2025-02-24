import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './qr-code.types'

export interface UseQrCodeProps extends Optional<Omit<qrcode.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * Use this prop to control the value of the qr code.
   */
  modelValue?: qrcode.Props['value']
}

export interface UseQrCodeReturn extends ComputedRef<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}, emit?: EmitFn<RootEmits>): UseQrCodeReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<qrcode.Props>(() => ({
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

  const service = useMachine(qrcode.machine, context)
  return computed(() => qrcode.connect(service, normalizeProps))
}
