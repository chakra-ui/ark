import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseQrCodeProps extends Optional<Omit<qrcode.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseQrCodeReturn extends qrcode.Api<PropTypes> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: qrcode.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(qrcode.machine, machineProps)
  return qrcode.connect(service, normalizeProps)
}
