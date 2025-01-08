import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the slider when it is first rendered.
   * Use when you do not need to control the state of the slider.
   */
  defaultValue?: qrcode.Context['value']
}
export interface UseQrCodeReturn extends Accessor<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}) => {
  const id = createId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const initialContext = $derived({
    id,
    dir: locale.dir,
    value: props.defaultValue,
    getRootNode: env.getRootNode,
    ...props,
  })

  const context = $derived({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(qrcode.machine(initialContext), { context })
  const api = $derived(() => qrcode.connect(state, send, normalizeProps))

  return api
}
