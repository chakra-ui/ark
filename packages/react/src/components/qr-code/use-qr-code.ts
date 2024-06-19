import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseQrCodeReturn extends qrcode.Api<PropTypes> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: qrcode.Context = {
    id: useId(),
    dir,
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(qrcode.machine(context), { context })
  return qrcode.connect(state, send, normalizeProps)
}
