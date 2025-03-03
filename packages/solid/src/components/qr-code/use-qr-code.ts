import * as qrCode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseQrCodeProps extends Optional<Omit<qrCode.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseQrCodeReturn extends Accessor<qrCode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<qrCode.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(qrCode.machine, machineProps)
  return createMemo(() => qrCode.connect(service, normalizeProps))
}
