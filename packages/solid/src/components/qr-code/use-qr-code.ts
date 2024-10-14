import * as qrCode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseQrCodeProps
  extends Optional<Omit<qrCode.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseQrCodeReturn extends Accessor<qrCode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(qrCode.machine(context()), {
    context,
  })

  return createMemo(() => qrCode.connect(state, send, normalizeProps))
}
