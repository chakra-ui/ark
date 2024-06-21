import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as signaturePad from '@zag-js/signature-pad'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'
import { useFieldContext } from '../field'

export interface UseSignaturePadProps
  extends Optional<Omit<signaturePad.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseSignaturePadReturn extends signaturePad.Api<PropTypes> {}

export const useSignaturePad = (props: UseSignaturePadProps): UseSignaturePadReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const initialContext: signaturePad.Context = {
    id: useId(),
    ids: {
      // label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    getRootNode,
    ...props,
  }

  const context: signaturePad.Context = {
    ...initialContext,
    drawing: props.drawing,
    onDraw: useEvent(props.onDraw),
    onDrawEnd: useEvent(props.onDrawEnd),
  }

  const [state, send] = useMachine(signaturePad.machine(initialContext), { context })

  return signaturePad.connect(state, send, normalizeProps)
}
