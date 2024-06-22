import * as signaturePad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseSignaturePadProps
  extends Optional<Omit<signaturePad.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends Accessor<signaturePad.Api<PropTypes>> {}

export const useSignaturePad = (props: UseSignaturePadProps): UseSignaturePadReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const context = createMemo<signaturePad.Context>(() => ({
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(signaturePad.machine(context()), { context })

  return createMemo(() => signaturePad.connect(state, send, normalizeProps))
}
