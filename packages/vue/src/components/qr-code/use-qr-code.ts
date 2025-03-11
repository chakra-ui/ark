import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './qr-code.types'

export interface UseQrCodeProps extends Optional<Omit<qrcode.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the qr code
   */
  modelValue?: qrcode.Props['value']
}

export interface UseQrCodeReturn extends ComputedRef<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: MaybeRef<UseQrCodeProps> = {}, emit?: EmitFn<RootEmits>): UseQrCodeReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<qrcode.Props>(() => {
    const localeProps = toValue<UseQrCodeProps>(props)

    return {
      id,
      dir: locale.value.dir,
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(qrcode.machine, context)
  return computed(() => qrcode.connect(service, normalizeProps))
}
