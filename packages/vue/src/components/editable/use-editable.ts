import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './editable'

export interface UseEditableProps
  extends Optional<
    Omit<editable.Context, 'dir' | 'getRootNode' | 'value' | 'edit.controlled'>,
    'id'
  > {
  /**
   * The initial edit state of the editable when it is first rendered.
   * Use when you do not need to control its edit state.
   */
  defaultEdit?: editable.Context['edit']
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: editable.Context['value']
  modelValue?: editable.Context['value']
}

export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (
  props: UseEditableProps = {},
  emit?: EmitFn<RootEmits>,
): UseEditableReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()
  const context = computed<editable.Context>(() => ({
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
    edit: props.defaultEdit,
    'edit.controlled': props.edit !== undefined,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onEditChange: (details) => {
      emit?.('editChange', details)
      emit?.('update:edit', details.edit)
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

  const [state, send] = useMachine(editable.machine(context.value), { context })
  return computed(() => editable.connect(state.value, send, normalizeProps))
}
