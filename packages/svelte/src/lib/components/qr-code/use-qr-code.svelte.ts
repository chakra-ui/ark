import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseQrCodeProps extends Omit<qrcode.Props, 'dir' | 'getRootNode'> {}
export interface UseQrCodeReturn extends Accessor<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: MaybeFunction<UseQrCodeProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(qrcode.machine, () => machineProps)
  const api = $derived(qrcode.connect(service, normalizeProps))

  return () => api
}
