import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { cleanProps } from '../../utils'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseQrCodeReturn extends ComputedRef<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps): UseQrCodeReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<qrcode.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(qrcode.machine(context.value), { context })

  return computed(() => qrcode.connect(state.value, send, normalizeProps))
}
