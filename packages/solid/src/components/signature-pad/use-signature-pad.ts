import * as signaturePad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSignaturePadProps
  extends Optional<Omit<signaturePad.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends Accessor<signaturePad.Api<PropTypes>> {}

export const useSignaturePad = (props: UseSignaturePadProps): UseSignaturePadReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo<signaturePad.Context>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(signaturePad.machine(context()), { context })

  return createMemo(() => signaturePad.connect(state, send, normalizeProps))
}
