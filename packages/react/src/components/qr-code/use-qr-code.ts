import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the qr code when it is first rendered.
   * Use when you do not need to control the state of the qr code.
   */
  defaultValue?: qrcode.Context['value']
}

export interface UseQrCodeReturn extends qrcode.Api<PropTypes> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: qrcode.Context = {
    id: useId(),
    dir,
    value: props.defaultValue,
    getRootNode,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    ...props,
  }

  const context: qrcode.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(qrcode.machine(initialContext), { context })
  return qrcode.connect(state, send, normalizeProps)
}
