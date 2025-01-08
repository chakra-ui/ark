import * as qrCode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseQrCodeProps
  extends Optional<Omit<qrCode.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the qr code when it is first rendered.
   * Use when you do not need to control the state of the qr code.
   */
  defaultValue?: qrCode.Context['value']
}

export interface UseQrCodeReturn extends Accessor<qrCode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}): UseQrCodeReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))

  const [state, send] = useMachine(qrCode.machine(context()), {
    context,
  })
  return createMemo(() => qrCode.connect(state, send, normalizeProps))
}
