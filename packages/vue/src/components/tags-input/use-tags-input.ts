import * as tagsInput from '@zag-js/tags-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './tags-input.types'

export interface UseTagsInputProps extends Optional<Omit<tagsInput.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the tags input
   */
  modelValue?: tagsInput.Props['value']
}

export interface UseTagsInputReturn extends ComputedRef<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (props: UseTagsInputProps = {}, emit?: EmitFn<RootEmits>): UseTagsInputReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<tagsInput.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    invalid: field?.value.invalid,
    readOnly: field?.value.readOnly,
    required: field?.value.required,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
      props.onValueChange?.(details)
    },
    onFocusOutside: (details) => {
      emit?.('focusOutside', details)
      props.onFocusOutside?.(details)
    },
    onHighlightChange: (details) => {
      emit?.('highlightChange', details)
      props.onHighlightChange?.(details)
    },
    onInputValueChange: (details) => {
      emit?.('inputValueChange', details)
      emit?.('update:inputValue', details.inputValue)
      props.onInputValueChange?.(details)
    },
    onInteractOutside: (details) => {
      emit?.('interactOutside', details)
      props.onInteractOutside?.(details)
    },
    onPointerDownOutside: (details) => {
      emit?.('pointerDownOutside', details)
      props.onPointerDownOutside?.(details)
    },
    onValueInvalid: (details) => {
      emit?.('valueInvalid', details)
      props.onValueInvalid?.(details)
    },
  }))

  const service = useMachine(tagsInput.machine, context)
  return computed(() => tagsInput.connect(service, normalizeProps))
}
