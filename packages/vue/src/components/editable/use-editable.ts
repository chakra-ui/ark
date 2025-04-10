import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './editable'

export interface UseEditableProps extends Optional<Omit<editable.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the editable
   */
  modelValue?: editable.Props['value']
}

export interface UseEditableReturn extends ComputedRef<editable.Api<PropTypes>> {}

export const useEditable = (props: MaybeRef<UseEditableProps> = {}, emit?: EmitFn<RootEmits>): UseEditableReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<editable.Props>(() => {
    const localeProps = toValue<UseEditableProps>(props)

    return {
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
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onEditChange: (details) => {
        emit?.('editChange', details)
        emit?.('update:edit', details.edit)
        localeProps.onEditChange?.(details)
      },
      onValueChange(details) {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localeProps.onFocusOutside?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localeProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localeProps.onPointerDownOutside?.(details)
      },
      onValueCommit: (details) => {
        emit?.('valueCommit', details)
        localeProps.onValueCommit?.(details)
      },
      onValueRevert: (details) => {
        emit?.('valueRevert', details)
        localeProps.onValueRevert?.(details)
      },
    }
  })

  const service = useMachine(editable.machine, context)
  return computed(() => editable.connect(service, normalizeProps))
}
