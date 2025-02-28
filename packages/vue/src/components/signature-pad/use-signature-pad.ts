import * as signaturepad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './signature-pad.types'

export interface UseSignaturePadProps extends Optional<Omit<signaturepad.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends ComputedRef<signaturepad.Api<PropTypes>> {}

export const useSignaturePad = (props: UseSignaturePadProps = {}, emit?: EmitFn<RootEmits>): UseSignaturePadReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<signaturepad.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onDraw: (details) => {
      emit?.('draw', details)
      props.onDraw?.(details)
    },
    onDrawEnd: (details) => {
      emit?.('drawEnd', details)
      props.onDrawEnd?.(details)
    },
  }))

  const service = useMachine(signaturepad.machine, context)
  return computed(() => signaturepad.connect(service, normalizeProps))
}
