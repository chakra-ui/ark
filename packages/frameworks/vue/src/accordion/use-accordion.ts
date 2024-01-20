import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export interface UseAccordionProps {
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   */
  collapsible?: accordion.Context['collapsible']
  /**
   * The document's text/writing direction.
   */
  dir?: accordion.Context['dir']
  /**
   * Whether the accordion items are disabled
   * @default false
   */
  disabled?: accordion.Context['disabled']
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: accordion.Context['getRootNode']
  /**
   * The unique identifier of the machine.
   */
  id?: accordion.Context['id']
  /**
   * The ids of the elements in the accordion. Useful for composition.
   */
  ids?: accordion.Context['ids']
  /**
   * Whether multiple accordion items can be open at the same time.
   * @default false
   */
  multiple?: accordion.Context['multiple']
  /**
   * The orientation of the accordion items.
   */
  orientation?: accordion.Context['orientation']
  /**
   * The `id` of the accordion item that is currently being opened.
   */
  modelValue?: accordion.Context['value']
}

export interface UseAccordionReturn extends ComputedRef<accordion.Api<PropTypes>> {}

export const useAccordion = (
  props: UseAccordionProps,
  emit: CallableFunction,
): UseAccordionReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    accordion.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFocusChange: (details) => {
        emit('focusChange', details)
      },
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => accordion.connect(state.value, send, normalizeProps))
}
