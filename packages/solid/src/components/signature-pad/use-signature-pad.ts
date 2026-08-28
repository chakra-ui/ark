import * as signaturePad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useFieldContext } from '../field/index.tsx'

export interface UseSignaturePadProps extends Optional<Omit<signaturePad.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends Accessor<signaturePad.Api<PropTypes>> {}

export const useSignaturePad = (props?: MaybeAccessor<UseSignaturePadProps>): UseSignaturePadReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<signaturePad.Props>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(signaturePad.machine, machineProps)
  return createMemo(() => signaturePad.connect(service, normalizeProps))
}
