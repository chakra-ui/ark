import * as cascadeSelect from '@zag-js/cascade-select'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { TreeCollection, TreeNode as CascadeSelectNode } from '../collection'
import { useFieldContext } from '../field'
import type { RootEmits } from './cascade-select.types'

export interface UseCascadeSelectProps<T extends CascadeSelectNode> extends Optional<
  Omit<cascadeSelect.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  collection: TreeCollection<T>
  modelValue?: string[][]
}

export interface UseCascadeSelectReturn<T extends CascadeSelectNode> extends ComputedRef<
  cascadeSelect.Api<PropTypes, T>
> {}

export const useCascadeSelect = <T extends CascadeSelectNode>(
  props: MaybeRef<UseCascadeSelectProps<T>>,
  emit?: EmitFn<RootEmits>,
): UseCascadeSelectReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<cascadeSelect.Props<T>>(() => {
    const localProps = toValue<UseCascadeSelectProps<T>>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenInput: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      invalid: field?.value.invalid,
      required: field?.value.required,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onHighlightChange: (details) => {
        emit?.('highlightChange', details)
        localProps.onHighlightChange?.(details)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localProps.onOpenChange?.(details)
      },
    }
  })

  const service = useMachine(cascadeSelect.machine, context)
  return computed(() => cascadeSelect.connect<PropTypes, T>(service, normalizeProps))
}
