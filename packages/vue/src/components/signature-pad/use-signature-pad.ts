import * as signaturepad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import { useFieldContext } from '../field'
import type { RootEmits } from './signature-pad.types'

export interface UseSignaturePadProps extends Optional<Omit<signaturepad.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends ComputedRef<signaturepad.Api<PropTypes>> {}

export const useSignaturePad = (
  props: MaybeRef<UseSignaturePadProps> = {},
  emit?: EmitFn<RootEmits>,
): UseSignaturePadReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<signaturepad.Props>(() => {
    const localProps = toValue<UseSignaturePadProps>(props)

    return {
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
      ...cleanProps(localProps),
      onDraw: (details) => {
        emit?.('update:paths', details.paths)
        emit?.('draw', details)
        localProps.onDraw?.(details)
      },
      onDrawEnd: (details) => {
        emit?.('drawEnd', details)
        localProps.onDrawEnd?.(details)
      },
    }
  })

  const service = useMachine(signaturepad.machine, context)
  return computed(() => signaturepad.connect(service, normalizeProps))
}
