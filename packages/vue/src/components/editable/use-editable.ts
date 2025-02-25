import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './editable'

export interface UseEditableProps
  extends Optional<Omit<editable.Props, 'dir' | 'getRootNode' | 'value' | 'edit'>, 'id'> {
  /**
   * The v-model value of the editable
   */
  modelValue?: editable.Props['value']
  /**
   * The v-model edit state of the editable
   */
  modelEdit?: editable.Props['edit']
}
export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps = {}, emit?: EmitFn<RootEmits>): UseEditableReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<editable.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      input: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    invalid: field?.value.invalid,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    dir: locale.value.dir,
    value: props.modelValue,
    edit: props.modelEdit,
    getRootNode: env?.value.getRootNode,
    onEditChange: (details) => {
      emit?.('editChange', details)
      emit?.('update:edit', details.edit) // TODO: remove this
      emit?.('update:modelEdit', details.edit)
    },
    onValueChange(details) {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    onValueCommit: (details) => emit?.('valueCommit', details),
    onValueRevert: (details) => emit?.('valueRevert', details),
    ...cleanProps(props),
  }))

  const service = useMachine(editable.machine, context)
  return computed(() => editable.connect(service, normalizeProps))
}
